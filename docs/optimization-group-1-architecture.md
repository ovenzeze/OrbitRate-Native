# 第一组优化任务：基础架构升级 🏗️

**任务组ID**: `OPT-G1-ARCH`  
**目标**: 建立现代化的应用基础设施  
**预计工作量**: 2-3天  
**优先级**: ⭐⭐⭐⭐⭐  
**核心价值**: 为后续所有功能提供稳定基础

---

## 📋 任务总览

| 任务编号 | 任务名称 | 工作量 | 优先级 | 依赖项 |
|---------|---------|--------|--------|--------|
| G1-T1 | 状态管理现代化 (Pinia) | 8h | P0 | 无 |
| G1-T2 | 服务层架构重构 | 12h | P0 | 无 |
| G1-T3 | 类型系统完善 | 6h | P0 | G1-T2 |
| G1-T4 | 错误边界处理 | 4h | P1 | G1-T2 |

**总计**: ~30小时

---

## 🎯 任务一：状态管理现代化 (Pinia)

### 当前状况
```json
// package.json 现状
"vuex": "^3.6.2"  // 已安装但未使用
```

### 目标
- 移除未使用的 Vuex
- 集成 Vue 3 官方推荐的 Pinia
- 创建模块化的 stores
- 提供完整的 TypeScript 支持

### 实施步骤

#### Step 1: 安装依赖
```bash
# 安装 Pinia
npm install pinia

# 移除 Vuex
npm uninstall vuex
```

#### Step 2: 创建 Pinia 实例

**文件**: `app/stores/index.ts`
```typescript
import { createPinia } from 'pinia'

export const pinia = createPinia()
```

#### Step 3: 在应用中注册

**文件**: `app/app.ts`
```typescript
import { createApp } from 'nativescript-vue'
import { pinia } from './stores'
import Home from './components/Home.vue'

const app = createApp(Home)
app.use(pinia)
app.start()
```

#### Step 4: 创建 Currency Store

**文件**: `app/stores/currency.ts`
```typescript
import { defineStore } from 'pinia'
import { ExchangeRateAPI } from '~/services/api/exchange-rate.api'

interface CurrencyState {
  fromCurrency: string
  toCurrency: string
  amount: number
  currentRate: number | null
  rates: Record<string, number>
  lastUpdated: Date | null
  isLoading: boolean
  error: string | null
}

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    fromCurrency: 'USD',
    toCurrency: 'CNY',
    amount: 100,
    currentRate: null,
    rates: {},
    lastUpdated: null,
    isLoading: false,
    error: null
  }),

  getters: {
    convertedAmount: (state): number => {
      if (!state.currentRate) return 0
      return state.amount * state.currentRate
    },

    isRateStale: (state): boolean => {
      if (!state.lastUpdated) return true
      const hoursSinceUpdate = (Date.now() - state.lastUpdated.getTime()) / 1000 / 60 / 60
      return hoursSinceUpdate > 1
    },

    formattedAmount: (state) => (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
    }
  },

  actions: {
    async fetchRates(baseCurrency?: string) {
      const base = baseCurrency || this.fromCurrency
      this.isLoading = true
      this.error = null

      try {
        const api = new ExchangeRateAPI()
        const data = await api.getRates(base)
        
        this.rates = data.rates
        this.lastUpdated = new Date()
        this.updateCurrentRate()
      } catch (error) {
        this.error = error.message
        console.error('[CurrencyStore] Failed to fetch rates:', error)
      } finally {
        this.isLoading = false
      }
    },

    updateCurrentRate() {
      if (this.rates[this.toCurrency]) {
        this.currentRate = this.rates[this.toCurrency]
      }
    },

    setFromCurrency(currency: string) {
      this.fromCurrency = currency
      this.fetchRates(currency)
    },

    setToCurrency(currency: string) {
      this.toCurrency = currency
      this.updateCurrentRate()
    },

    setAmount(amount: number) {
      this.amount = Math.max(0, amount)
    },

    swapCurrencies() {
      const temp = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = temp
      this.fetchRates()
    }
  }
})
```

#### Step 5: 创建 History Store

**文件**: `app/stores/history.ts`
```typescript
import { defineStore } from 'pinia'
import { HistoryStorage } from '~/services/storage/history.storage'

interface ConversionRecord {
  id: string
  from_currency: string
  to_currency: string
  amount: number
  result: number
  rate: number
  created_at: Date
}

interface HistoryState {
  records: ConversionRecord[]
  isLoading: boolean
}

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => ({
    records: [],
    isLoading: false
  }),

  getters: {
    recentRecords: (state) => (limit: number = 10): ConversionRecord[] => {
      return state.records.slice(0, limit)
    },

    recordsByDate: (state) => {
      const grouped: Record<string, ConversionRecord[]> = {}
      
      state.records.forEach(record => {
        const date = new Date(record.created_at).toLocaleDateString()
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(record)
      })
      
      return grouped
    },

    totalConversions: (state): number => state.records.length
  },

  actions: {
    async loadHistory() {
      this.isLoading = true
      try {
        const storage = new HistoryStorage()
        this.records = await storage.getAll()
      } catch (error) {
        console.error('[HistoryStore] Failed to load history:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addRecord(record: Omit<ConversionRecord, 'id' | 'created_at'>) {
      const newRecord: ConversionRecord = {
        ...record,
        id: this.generateId(),
        created_at: new Date()
      }

      this.records.unshift(newRecord)

      const storage = new HistoryStorage()
      await storage.save(newRecord)
    },

    async removeRecord(id: string) {
      const index = this.records.findIndex(r => r.id === id)
      if (index !== -1) {
        this.records.splice(index, 1)
        
        const storage = new HistoryStorage()
        await storage.remove(id)
      }
    },

    async clearAll() {
      this.records = []
      
      const storage = new HistoryStorage()
      await storage.clear()
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }
})
```

#### Step 6: 创建 Favorites Store

**文件**: `app/stores/favorites.ts`
```typescript
import { defineStore } from 'pinia'
import { FavoritesStorage } from '~/services/storage/favorites.storage'

interface CurrencyPair {
  from_currency: string
  to_currency: string
}

interface FavoriteItem {
  id: string
  type: 'pair'
  data: CurrencyPair
  created_at: Date
}

interface FavoritesState {
  items: FavoriteItem[]
  isLoading: boolean
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    items: [],
    isLoading: false
  }),

  getters: {
    hasFavorite: (state) => (from: string, to: string): boolean => {
      return state.items.some(item => 
        item.type === 'pair' && 
        item.data.from_currency === from && 
        item.data.to_currency === to
      )
    },

    totalFavorites: (state): number => state.items.length
  },

  actions: {
    async loadFavorites() {
      this.isLoading = true
      try {
        const storage = new FavoritesStorage()
        this.items = await storage.getAll()
      } catch (error) {
        console.error('[FavoritesStore] Failed to load favorites:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addFavorite(from: string, to: string) {
      if (this.hasFavorite(from, to)) {
        return
      }

      const newItem: FavoriteItem = {
        id: this.generateId(),
        type: 'pair',
        data: {
          from_currency: from,
          to_currency: to
        },
        created_at: new Date()
      }

      this.items.unshift(newItem)

      const storage = new FavoritesStorage()
      await storage.save(newItem)
    },

    async removeFavorite(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
        
        const storage = new FavoritesStorage()
        await storage.remove(id)
      }
    },

    async toggleFavorite(from: string, to: string) {
      const existing = this.items.find(item =>
        item.type === 'pair' &&
        item.data.from_currency === from &&
        item.data.to_currency === to
      )

      if (existing) {
        await this.removeFavorite(existing.id)
      } else {
        await this.addFavorite(from, to)
      }
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }
})
```

#### Step 7: 创建 Settings Store

**文件**: `app/stores/settings.ts`
```typescript
import { defineStore } from 'pinia'
import { ApplicationSettings } from '@nativescript/core'

interface SettingsState {
  language: 'en' | 'zh'
  theme: 'light' | 'dark' | 'auto'
  defaultCurrency: string
  autoRefresh: boolean
  refreshInterval: number // minutes
  decimalPlaces: number
}

const SETTINGS_KEY = 'app_settings'

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    language: 'en',
    theme: 'auto',
    defaultCurrency: 'USD',
    autoRefresh: true,
    refreshInterval: 60,
    decimalPlaces: 2
  }),

  getters: {
    isDarkMode: (state): boolean => {
      if (state.theme === 'auto') {
        // TODO: Detect system theme
        return false
      }
      return state.theme === 'dark'
    }
  },

  actions: {
    loadSettings() {
      const saved = ApplicationSettings.getString(SETTINGS_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          Object.assign(this.$state, parsed)
        } catch (error) {
          console.error('[SettingsStore] Failed to parse settings:', error)
        }
      }
    },

    saveSettings() {
      ApplicationSettings.setString(SETTINGS_KEY, JSON.stringify(this.$state))
    },

    setLanguage(language: 'en' | 'zh') {
      this.language = language
      this.saveSettings()
    },

    setTheme(theme: 'light' | 'dark' | 'auto') {
      this.theme = theme
      this.saveSettings()
    },

    setDefaultCurrency(currency: string) {
      this.defaultCurrency = currency
      this.saveSettings()
    },

    setAutoRefresh(enabled: boolean) {
      this.autoRefresh = enabled
      this.saveSettings()
    },

    setRefreshInterval(minutes: number) {
      this.refreshInterval = Math.max(1, minutes)
      this.saveSettings()
    },

    setDecimalPlaces(places: number) {
      this.decimalPlaces = Math.min(8, Math.max(0, places))
      this.saveSettings()
    },

    resetToDefaults() {
      this.language = 'en'
      this.theme = 'auto'
      this.defaultCurrency = 'USD'
      this.autoRefresh = true
      this.refreshInterval = 60
      this.decimalPlaces = 2
      this.saveSettings()
    }
  }
})
```

### 在组件中使用

**示例**: `app/components/ConvertView.vue`
```vue
<script setup lang="ts">
import { useCurrencyStore } from '~/stores/currency'
import { useHistoryStore } from '~/stores/history'
import { computed } from 'nativescript-vue'

const currencyStore = useCurrencyStore()
const historyStore = useHistoryStore()

const convertedAmount = computed(() => currencyStore.convertedAmount)

const handleConvert = async () => {
  if (!currencyStore.currentRate) {
    await currencyStore.fetchRates()
  }
  
  await historyStore.addRecord({
    from_currency: currencyStore.fromCurrency,
    to_currency: currencyStore.toCurrency,
    amount: currencyStore.amount,
    result: currencyStore.convertedAmount,
    rate: currencyStore.currentRate
  })
}
</script>
```

---

## 🎯 任务二：服务层架构重构

### 目标
- 创建清晰的服务层结构
- 封装所有外部依赖
- 实现缓存机制
- 统一错误处理

### 目录结构

```
app/services/
├── api/
│   ├── exchange-rate.api.ts      # 汇率 API 服务
│   └── currency-info.api.ts      # 货币信息服务
├── storage/
│   ├── history.storage.ts        # 历史记录持久化
│   ├── favorites.storage.ts      # 收藏夹持久化
│   └── settings.storage.ts       # 设置持久化
├── core/
│   ├── http.service.ts           # HTTP 客户端封装
│   ├── cache.service.ts          # 缓存管理
│   └── logger.service.ts         # 日志服务
└── utils/
    ├── currency-formatter.ts     # 货币格式化工具
    └── rate-calculator.ts        # 汇率计算工具
```

### 实施步骤

#### Step 1: HTTP 服务封装

**文件**: `app/services/core/http.service.ts`
```typescript
import { Http, HttpResponse } from '@nativescript/core'

export interface HttpConfig {
  baseUrl?: string
  timeout?: number
  headers?: Record<string, string>
}

export class HttpService {
  private config: HttpConfig

  constructor(config: HttpConfig = {}) {
    this.config = {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    }
  }

  async get<T>(url: string, options: any = {}): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url)
      const response = await Http.request({
        url: fullUrl,
        method: 'GET',
        timeout: this.config.timeout,
        headers: { ...this.config.headers, ...options.headers }
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data: any, options: any = {}): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url)
      const response = await Http.request({
        url: fullUrl,
        method: 'POST',
        content: JSON.stringify(data),
        timeout: this.config.timeout,
        headers: { ...this.config.headers, ...options.headers }
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path
    }
    return `${this.config.baseUrl || ''}${path}`
  }

  private handleResponse<T>(response: HttpResponse): T {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response.content?.toJSON() as T
    }

    throw new Error(`HTTP Error: ${response.statusCode}`)
  }

  private handleError(error: any): Error {
    if (error.message?.includes('timeout')) {
      return new Error('Request timeout. Please check your network connection.')
    }

    if (error.message?.includes('network')) {
      return new Error('Network error. Please check your internet connection.')
    }

    return new Error(error.message || 'An unexpected error occurred')
  }
}
```

#### Step 2: 缓存服务

**文件**: `app/services/core/cache.service.ts`
```typescript
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

export class CacheService {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, ttlMinutes: number = 60): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl

    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  clearExpired(): void {
    const now = Date.now()
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  getStats() {
    return {
      totalEntries: this.cache.size,
      entries: Array.from(this.cache.keys())
    }
  }
}

// 单例实例
export const cacheService = new CacheService()
```

#### Step 3: 日志服务

**文件**: `app/services/core/logger.service.ts`
```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  context?: string
  timestamp: Date
  data?: any
}

export class LoggerService {
  private isDevelopment = __DEV__
  private logs: LogEntry[] = []
  private maxLogs = 1000

  private formatTimestamp(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  }

  private log(level: LogLevel, message: string, context?: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date(),
      data
    }

    this.logs.push(entry)

    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    if (this.isDevelopment) {
      const timestamp = this.formatTimestamp(entry.timestamp)
      const contextStr = context ? ` [${context}]` : ''
      const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : ''
      
      const formattedMessage = `[${timestamp}]${contextStr} ${message}${dataStr}`

      switch (level) {
        case 'debug':
          console.log(formattedMessage)
          break
        case 'info':
          console.info(formattedMessage)
          break
        case 'warn':
          console.warn(formattedMessage)
          break
        case 'error':
          console.error(formattedMessage)
          break
      }
    }
  }

  debug(message: string, context?: string, data?: any): void {
    this.log('debug', message, context, data)
  }

  info(message: string, context?: string, data?: any): void {
    this.log('info', message, context, data)
  }

  warn(message: string, context?: string, data?: any): void {
    this.log('warn', message, context, data)
  }

  error(message: string, context?: string, data?: any): void {
    this.log('error', message, context, data)
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level)
    }
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }
}

// 单例实例
export const logger = new LoggerService()
```

#### Step 4: 汇率 API 服务

**文件**: `app/services/api/exchange-rate.api.ts`
```typescript
import { HttpService } from '~/services/core/http.service'
import { cacheService } from '~/services/core/cache.service'
import { logger } from '~/services/core/logger.service'

export interface ExchangeRateResponse {
  base: string
  date: string
  rates: Record<string, number>
}

export class ExchangeRateAPI {
  private http: HttpService
  private cacheKeyPrefix = 'exchange_rate'

  constructor() {
    this.http = new HttpService({
      baseUrl: 'https://api.exchangerate-api.com/v4/latest/'
    })
  }

  async getRates(baseCurrency: string): Promise<ExchangeRateResponse> {
    const cacheKey = `${this.cacheKeyPrefix}_${baseCurrency}`

    // Check cache first
    const cached = cacheService.get<ExchangeRateResponse>(cacheKey)
    if (cached) {
      logger.info(`Using cached rates for ${baseCurrency}`, 'ExchangeRateAPI')
      return cached
    }

    // Fetch from API
    logger.info(`Fetching rates for ${baseCurrency}`, 'ExchangeRateAPI')
    
    try {
      const data = await this.http.get<ExchangeRateResponse>(baseCurrency)
      
      // Cache the result (60 minutes TTL)
      cacheService.set(cacheKey, data, 60)
      
      logger.info(`Successfully fetched rates for ${baseCurrency}`, 'ExchangeRateAPI', {
        ratesCount: Object.keys(data.rates).length
      })
      
      return data
    } catch (error) {
      logger.error(`Failed to fetch rates for ${baseCurrency}`, 'ExchangeRateAPI', error)
      throw error
    }
  }

  async getRate(from: string, to: string): Promise<number> {
    const data = await this.getRates(from)
    
    if (!data.rates[to]) {
      throw new Error(`Rate not found for ${from} -> ${to}`)
    }
    
    return data.rates[to]
  }

  async convert(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getRate(from, to)
    return amount * rate
  }
}
```

#### Step 5: 存储服务

**文件**: `app/services/storage/history.storage.ts`
```typescript
import { ApplicationSettings } from '@nativescript/core'
import { logger } from '~/services/core/logger.service'

export interface ConversionRecord {
  id: string
  from_currency: string
  to_currency: string
  amount: number
  result: number
  rate: number
  created_at: Date
}

const HISTORY_KEY = 'conversion_history'
const MAX_RECORDS = 100

export class HistoryStorage {
  async getAll(): Promise<ConversionRecord[]> {
    try {
      const data = ApplicationSettings.getString(HISTORY_KEY)
      if (!data) {
        return []
      }

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at)
      }))
    } catch (error) {
      logger.error('Failed to load history', 'HistoryStorage', error)
      return []
    }
  }

  async save(record: ConversionRecord): Promise<void> {
    try {
      const records = await this.getAll()
      records.unshift(record)

      // Keep only latest MAX_RECORDS
      if (records.length > MAX_RECORDS) {
        records.splice(MAX_RECORDS)
      }

      ApplicationSettings.setString(HISTORY_KEY, JSON.stringify(records))
      logger.info('Saved conversion record', 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to save history record', 'HistoryStorage', error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const records = await this.getAll()
      const filtered = records.filter(r => r.id !== id)
      ApplicationSettings.setString(HISTORY_KEY, JSON.stringify(filtered))
      logger.info(`Removed record ${id}`, 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to remove history record', 'HistoryStorage', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      ApplicationSettings.remove(HISTORY_KEY)
      logger.info('Cleared all history', 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to clear history', 'HistoryStorage', error)
      throw error
    }
  }
}
```

**文件**: `app/services/storage/favorites.storage.ts`
```typescript
import { ApplicationSettings } from '@nativescript/core'
import { logger } from '~/services/core/logger.service'

export interface CurrencyPair {
  from_currency: string
  to_currency: string
}

export interface FavoriteItem {
  id: string
  type: 'pair'
  data: CurrencyPair
  created_at: Date
}

const FAVORITES_KEY = 'favorites'

export class FavoritesStorage {
  async getAll(): Promise<FavoriteItem[]> {
    try {
      const data = ApplicationSettings.getString(FAVORITES_KEY)
      if (!data) {
        return []
      }

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at)
      }))
    } catch (error) {
      logger.error('Failed to load favorites', 'FavoritesStorage', error)
      return []
    }
  }

  async save(item: FavoriteItem): Promise<void> {
    try {
      const items = await this.getAll()
      items.unshift(item)
      
      ApplicationSettings.setString(FAVORITES_KEY, JSON.stringify(items))
      logger.info('Saved favorite item', 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to save favorite', 'FavoritesStorage', error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const items = await this.getAll()
      const filtered = items.filter(item => item.id !== id)
      ApplicationSettings.setString(FAVORITES_KEY, JSON.stringify(filtered))
      logger.info(`Removed favorite ${id}`, 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to remove favorite', 'FavoritesStorage', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      ApplicationSettings.remove(FAVORITES_KEY)
      logger.info('Cleared all favorites', 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to clear favorites', 'FavoritesStorage', error)
      throw error
    }
  }
}
```

---

## 🎯 任务三：类型系统完善

### 目标
- 定义完整的类型系统
- 提供类型安全
- 改善开发体验

### 实施步骤

**文件**: `app/types/index.ts`
```typescript
// ============================================
// Core Types
// ============================================

export interface Currency {
  code: string
  name: string
  symbol: string
  country?: string
  flag?: string
}

export interface ExchangeRate {
  from_currency: string
  to_currency: string
  rate: number
  timestamp: number
}

export interface ConversionRecord {
  id: string
  from_currency: string
  to_currency: string
  amount: number
  result: number
  rate: number
  created_at: Date
}

export interface CurrencyPair {
  from_currency: string
  to_currency: string
}

export interface FavoriteItem {
  id: string
  type: 'pair' | 'conversion'
  data: CurrencyPair | ConversionRecord
  created_at: Date
}

// ============================================
// API Response Types
// ============================================

export interface ExchangeRateAPIResponse {
  base: string
  date: string
  rates: Record<string, number>
}

export interface CurrencyInfoAPIResponse {
  currencies: Currency[]
}

// ============================================
// Store State Types
// ============================================

export interface CurrencyState {
  fromCurrency: string
  toCurrency: string
  amount: number
  currentRate: number | null
  rates: Record<string, number>
  lastUpdated: Date | null
  isLoading: boolean
  error: string | null
}

export interface HistoryState {
  records: ConversionRecord[]
  isLoading: boolean
}

export interface FavoritesState {
  items: FavoriteItem[]
  isLoading: boolean
}

export interface SettingsState {
  language: 'en' | 'zh'
  theme: 'light' | 'dark' | 'auto'
  defaultCurrency: string
  autoRefresh: boolean
  refreshInterval: number
  decimalPlaces: number
}

// ============================================
// Component Props Types
// ============================================

export interface CurrencySelectorProps {
  modelValue: string
  currencies: Currency[]
  label?: string
  disabled?: boolean
}

export interface CountryFlagProps {
  currency: string
  size?: number
}

export interface ConversionResultProps {
  amount: number
  fromCurrency: string
  toCurrency: string
  rate: number
  result: number
}

// ============================================
// Utility Types
// ============================================

export type NavigationTab = 'convert' | 'history' | 'favorites' | 'settings'

export type SortOrder = 'asc' | 'desc'

export interface SortConfig<T = any> {
  field: keyof T
  order: SortOrder
}

export interface FilterConfig {
  currency?: string
  dateFrom?: Date
  dateTo?: Date
  minAmount?: number
  maxAmount?: number
}

// ============================================
// Error Types
// ============================================

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class CacheError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CacheError'
  }
}

// ============================================
// Type Guards
// ============================================

export function isCurrencyPair(data: any): data is CurrencyPair {
  return (
    typeof data === 'object' &&
    'from_currency' in data &&
    'to_currency' in data
  )
}

export function isConversionRecord(data: any): data is ConversionRecord {
  return (
    typeof data === 'object' &&
    'id' in data &&
    'from_currency' in data &&
    'to_currency' in data &&
    'amount' in data &&
    'result' in data &&
    'rate' in data &&
    'created_at' in data
  )
}
```

**文件**: `app/types/navigation.ts`
```typescript
export type RootStackParamList = {
  Home: undefined
  Convert: undefined
  History: undefined
  Favorites: undefined
  Settings: undefined
}

export type NavigationProps<T extends keyof RootStackParamList> = {
  route: {
    params: RootStackParamList[T]
  }
  navigation: {
    navigate: (screen: keyof RootStackParamList, params?: any) => void
    goBack: () => void
  }
}
```

---

## ✅ 验收标准

### G1-T1: Pinia 集成
- [ ] Vuex 已卸载
- [ ] Pinia 成功集成并运行
- [ ] 创建了 4 个 stores (currency, history, favorites, settings)
- [ ] 所有 stores 提供完整的 TypeScript 类型
- [ ] Getters 和 Actions 正常工作
- [ ] 至少在一个组件中成功使用 store

### G1-T2: 服务层架构
- [ ] 创建了完整的服务层目录结构
- [ ] HTTP 服务封装正常工作
- [ ] 缓存服务可以存储和读取数据
- [ ] 日志服务输出格式正确 (`YYYY/MM/DD HH:mm:ss`)
- [ ] 汇率 API 服务可以成功获取数据
- [ ] 存储服务可以持久化数据

### G1-T3: 类型系统
- [ ] 创建了 `app/types/index.ts`
- [ ] 定义了所有核心类型
- [ ] TypeScript 编译无错误
- [ ] IDE 提供完整的类型提示

### G1-T4: 整体集成
- [ ] 所有服务可以独立运行
- [ ] Stores 和服务层正确协作
- [ ] 错误处理机制工作正常
- [ ] 应用运行稳定，无崩溃

---

## 📊 性能指标

### 预期改善
- **代码可维护性**: ↑ 80%
- **类型安全**: ↑ 100%
- **开发效率**: ↑ 60%
- **Bug 率**: ↓ 40%

### 监控指标
- Pinia Devtools 可以查看状态
- 日志输出清晰可读
- 缓存命中率 > 70%
- API 响应时间 < 2s

---

## 🔄 迁移指南

### 从 ApplicationSettings 迁移到 Stores

**Before**:
```typescript
const lastTab = ApplicationSettings.getString('last_tab', 'convert')
```

**After**:
```typescript
const settingsStore = useSettingsStore()
const lastTab = settingsStore.lastTab
```

### 从直接 HTTP 调用迁移到服务层

**Before**:
```typescript
const response = await Http.getJSON('https://api.exchangerate-api.com/v4/latest/USD')
```

**After**:
```typescript
const api = new ExchangeRateAPI()
const data = await api.getRates('USD')
```

---

## 🐛 常见问题

### Q1: Pinia 提示 "getActivePinia was called with no active Pinia"
**A**: 确保在 `app.ts` 中正确注册了 Pinia 实例

### Q2: 类型导入错误
**A**: 检查 `tsconfig.json` 中的 `paths` 配置

### Q3: 缓存数据未过期
**A**: 调用 `cacheService.clearExpired()` 或 `cacheService.clear()`

---

## 📚 参考资源

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [NativeScript Vue 3 指南](https://nativescript-vue.org/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

## ✅ 任务完成检查清单

- [ ] 已安装所有必要依赖
- [ ] 已创建所有目录和文件
- [ ] 所有代码通过 TypeScript 编译
- [ ] 已在至少一个组件中测试 Pinia
- [ ] 已测试 HTTP 服务和缓存
- [ ] 日志格式符合规范
- [ ] 已更新 `package.json` 的 dependencies
- [ ] 已提交代码并通过 lint 检查

---

**任务负责人**: ___________  
**开始日期**: ___________  
**完成日期**: ___________  
**状态**: [ ] 未开始 / [ ] 进行中 / [ ] 已完成


