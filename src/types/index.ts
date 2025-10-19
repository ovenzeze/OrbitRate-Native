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
    data !== null &&
    'from_currency' in data &&
    'to_currency' in data &&
    typeof data.from_currency === 'string' &&
    typeof data.to_currency === 'string'
  )
}

export function isConversionRecord(data: any): data is ConversionRecord {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'from_currency' in data &&
    'to_currency' in data &&
    'amount' in data &&
    'result' in data &&
    'rate' in data &&
    'created_at' in data
  )
}
