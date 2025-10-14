# 第二组优化任务：用户体验增强 ✨

**任务组ID**: `OPT-G2-UX`  
**目标**: 提升国际化能力和视觉交互体验  
**预计工作量**: 2-3天  
**优先级**: ⭐⭐⭐⭐⭐  
**核心价值**: 直接提升用户感知价值和全球化能力

---

## 📋 任务总览

| 任务编号 | 任务名称 | 工作量 | 优先级 | 依赖项 |
|---------|---------|--------|--------|--------|
| G2-T1 | 图标系统升级 | 4h | P1 | 无 |
| G2-T2 | 国际化 (i18n) 实现 | 10h | P0 | 无 |
| G2-T3 | 国旗组件离线化 | 4h | P1 | 无 |
| G2-T4 | 动画与交互优化 | 8h | P2 | 无 |

**总计**: ~26小时

---

## 🎯 任务一：图标系统升级

### 当前状况

**问题点**:
```vue:1:51:app/components/Icon.vue
<!-- 手动维护 Unicode 映射 -->
<template>
  <Label :text="getIconChar()" class="icon" :fontSize="fontSize" :color="color" />
</template>

<script>
const iconMap = {
  'arrow-left': '\uf060',
  'arrow-right': '\uf061',
  // ... 手动维护 100+ 图标
}
</script>
```

**痛点**:
- ❌ 手动维护 Unicode 映射
- ❌ 需要手动管理字体文件
- ❌ 不支持多图标库切换
- ❌ 没有类型提示

### 目标

- ✅ 使用官方图标库组件
- ✅ 自动处理字体加载
- ✅ 支持 Font Awesome + Material Icons
- ✅ 提供 TypeScript 类型支持
- ✅ 按需加载优化包体积

### 实施步骤

#### Step 1: 安装依赖

```bash
npm install @nativescript-community/ui-icon
```

#### Step 2: 配置字体

**文件**: `app/app.ts`
```typescript
import { Application } from '@nativescript/core'
import { registerFonts } from '@nativescript-community/ui-icon'

// Register Font Awesome
registerFonts({
  'fa-solid': 'font-awesome-solid.ttf',
  'fa-brands': 'font-awesome-brands.ttf',
  'fa-regular': 'font-awesome-regular.ttf'
})

Application.run({ moduleName: 'app-root' })
```

#### Step 3: 创建图标组件包装器

**文件**: `app/components/AppIcon.vue`
```vue
<template>
  <Icon 
    :name="iconName" 
    :size="size" 
    :color="color"
    @tap="handleTap"
  />
</template>

<script setup lang="ts">
import { Icon } from '@nativescript-community/ui-icon'

export interface AppIconProps {
  name: string
  size?: number
  color?: string
  variant?: 'solid' | 'regular' | 'brands'
}

const props = withDefaults(defineProps<AppIconProps>(), {
  size: 24,
  color: '#000000',
  variant: 'solid'
})

const emit = defineEmits<{
  tap: []
}>()

const iconName = computed(() => {
  const prefix = props.variant === 'brands' ? 'fab' : 
                 props.variant === 'regular' ? 'far' : 'fas'
  
  // Remove 'fa-' prefix if exists
  const cleanName = props.name.replace(/^fa-/, '')
  
  return `${prefix} fa-${cleanName}`
})

const handleTap = () => {
  emit('tap')
}
</script>
```

#### Step 4: 定义图标常量

**文件**: `app/constants/icons.ts`
```typescript
export const ICONS = {
  // Navigation
  NAV_CONVERT: 'exchange-alt',
  NAV_HISTORY: 'clock',
  NAV_FAVORITES: 'star',
  NAV_SETTINGS: 'cog',
  
  // Actions
  ACTION_SWAP: 'exchange-alt',
  ACTION_COPY: 'copy',
  ACTION_DELETE: 'trash',
  ACTION_EDIT: 'edit',
  ACTION_SHARE: 'share',
  ACTION_ADD: 'plus',
  ACTION_REMOVE: 'minus',
  ACTION_SEARCH: 'search',
  ACTION_FILTER: 'filter',
  ACTION_REFRESH: 'sync',
  
  // Status
  STATUS_SUCCESS: 'check-circle',
  STATUS_ERROR: 'exclamation-circle',
  STATUS_WARNING: 'exclamation-triangle',
  STATUS_INFO: 'info-circle',
  STATUS_LOADING: 'spinner',
  
  // Arrows
  ARROW_UP: 'arrow-up',
  ARROW_DOWN: 'arrow-down',
  ARROW_LEFT: 'arrow-left',
  ARROW_RIGHT: 'arrow-right',
  ARROW_BACK: 'chevron-left',
  ARROW_FORWARD: 'chevron-right',
  
  // UI
  UI_CLOSE: 'times',
  UI_CHECK: 'check',
  UI_MENU: 'bars',
  UI_MORE: 'ellipsis-v',
  UI_CALENDAR: 'calendar',
  UI_HEART: 'heart',
  UI_HEART_FILL: 'heart', // Use variant="solid"
  
  // Currency specific
  CURRENCY_DOLLAR: 'dollar-sign',
  CURRENCY_EURO: 'euro-sign',
  CURRENCY_POUND: 'pound-sign',
  CURRENCY_YEN: 'yen-sign',
  CURRENCY_BITCOIN: 'bitcoin',
  
  // Others
  CHART_LINE: 'chart-line',
  CHART_BAR: 'chart-bar',
  GLOBE: 'globe',
  FLAG: 'flag',
  USER: 'user',
  BELL: 'bell'
} as const

export type IconName = typeof ICONS[keyof typeof ICONS]
```

#### Step 5: 创建类型定义

**文件**: `app/types/icons.ts`
```typescript
import { ICONS } from '~/constants/icons'

export type IconVariant = 'solid' | 'regular' | 'brands'

export interface IconConfig {
  name: string
  size?: number
  color?: string
  variant?: IconVariant
}

export type IconNameKey = keyof typeof ICONS
export type IconNameValue = typeof ICONS[IconNameKey]
```

#### Step 6: 在组件中使用

**示例**: 更新 `BottomNavigation.vue`
```vue
<template>
  <GridLayout columns="*, *, *, *" class="bottom-nav">
    <StackLayout col="0" @tap="navigate('convert')">
      <AppIcon 
        :name="ICONS.NAV_CONVERT"
        :color="activeTab === 'convert' ? '#6366f1' : '#94a3b8'"
        :size="24"
      />
      <Label :text="t('nav.convert')" />
    </StackLayout>

    <StackLayout col="1" @tap="navigate('history')">
      <AppIcon 
        :name="ICONS.NAV_HISTORY"
        :color="activeTab === 'history' ? '#6366f1' : '#94a3b8'"
        :size="24"
      />
      <Label :text="t('nav.history')" />
    </StackLayout>

    <StackLayout col="2" @tap="navigate('favorites')">
      <AppIcon 
        :name="ICONS.NAV_FAVORITES"
        :color="activeTab === 'favorites' ? '#6366f1' : '#94a3b8'"
        :size="24"
        :variant="activeTab === 'favorites' ? 'solid' : 'regular'"
      />
      <Label :text="t('nav.favorites')" />
    </StackLayout>

    <StackLayout col="3" @tap="navigate('settings')">
      <AppIcon 
        :name="ICONS.NAV_SETTINGS"
        :color="activeTab === 'settings' ? '#6366f1' : '#94a3b8'"
        :size="24"
      />
      <Label :text="t('nav.settings')" />
    </StackLayout>
  </GridLayout>
</template>

<script setup lang="ts">
import { ICONS } from '~/constants/icons'
import AppIcon from '~/components/AppIcon.vue'
</script>
```

### 迁移清单

需要更新的文件:
- [ ] `app/components/layout/BottomNavigation.vue`
- [ ] `app/components/ConvertView.vue`
- [ ] `app/components/HistoryView.vue`
- [ ] `app/components/FavoritesView.vue`
- [ ] `app/components/SettingsView.vue`

### 验收标准
- [ ] 所有图标正常显示
- [ ] 字体文件自动加载
- [ ] 图标切换流畅
- [ ] TypeScript 类型提示正常
- [ ] 旧的 `Icon.vue` 组件已移除

---

## 🎯 任务二：国际化 (i18n) 实现

### 当前状况

**问题**:
- 硬编码的中英文文本
- 无法动态切换语言
- 不支持扩展更多语言

### 目标

- ✅ 支持中英文切换
- ✅ 所有文本可翻译
- ✅ 运行时动态切换
- ✅ 为未来扩展做准备 (日语、韩语等)

### 实施步骤

#### Step 1: 安装依赖

```bash
npm install @nativescript/localize
npm install --save-dev nativescript-localize
```

#### Step 2: 配置 webpack

**文件**: `webpack.config.js`
```javascript
const { LocalizePlugin } = require('nativescript-localize/plugin')

module.exports = (env) => {
  webpack.chainWebpack((config) => {
    config.plugin('LocalizePlugin').use(LocalizePlugin)
  })

  return webpack.resolveConfig()
}
```

#### Step 3: 创建语言文件

**文件**: `app/i18n/en.json`
```json
{
  "app": {
    "name": "OrbitRate",
    "tagline": "Currency at Your Fingertips"
  },
  
  "nav": {
    "convert": "Convert",
    "history": "History",
    "favorites": "Favorites",
    "settings": "Settings"
  },
  
  "convert": {
    "title": "Currency Converter",
    "from": "From",
    "to": "To",
    "amount": "Amount",
    "result": "Result",
    "rate": "Exchange Rate",
    "swap": "Swap Currencies",
    "convert_button": "Convert",
    "add_to_favorites": "Add to Favorites",
    "placeholder_amount": "Enter amount",
    "updated_at": "Updated at {time}",
    "last_updated": "Last updated: {date}"
  },
  
  "history": {
    "title": "Conversion History",
    "empty": "No conversion history yet",
    "empty_subtitle": "Your conversions will appear here",
    "clear_all": "Clear All",
    "clear_confirm": "Are you sure you want to clear all history?",
    "delete_confirm": "Delete this record?",
    "item_format": "{amount} {from} = {result} {to}",
    "today": "Today",
    "yesterday": "Yesterday",
    "this_week": "This Week",
    "older": "Older"
  },
  
  "favorites": {
    "title": "Favorite Pairs",
    "empty": "No favorite pairs yet",
    "empty_subtitle": "Add frequently used currency pairs",
    "add_button": "Add Pair",
    "remove_confirm": "Remove from favorites?",
    "pair_format": "{from} → {to}"
  },
  
  "settings": {
    "title": "Settings",
    "language": "Language",
    "language_en": "English",
    "language_zh": "中文",
    "theme": "Theme",
    "theme_light": "Light",
    "theme_dark": "Dark",
    "theme_auto": "Auto",
    "currency": "Default Currency",
    "auto_refresh": "Auto Refresh",
    "refresh_interval": "Refresh Interval",
    "refresh_interval_unit": "{minutes} minutes",
    "decimal_places": "Decimal Places",
    "about": "About",
    "version": "Version",
    "clear_cache": "Clear Cache",
    "clear_cache_success": "Cache cleared successfully",
    "export_data": "Export Data",
    "import_data": "Import Data"
  },
  
  "currency": {
    "select": "Select Currency",
    "search": "Search currency...",
    "popular": "Popular",
    "all": "All Currencies",
    "usd": "US Dollar",
    "eur": "Euro",
    "gbp": "British Pound",
    "jpy": "Japanese Yen",
    "cny": "Chinese Yuan",
    "cad": "Canadian Dollar",
    "aud": "Australian Dollar",
    "chf": "Swiss Franc",
    "hkd": "Hong Kong Dollar",
    "sgd": "Singapore Dollar"
  },
  
  "errors": {
    "network": "Network error. Please check your connection.",
    "timeout": "Request timeout. Please try again.",
    "api": "Failed to fetch exchange rates",
    "invalid_amount": "Please enter a valid amount",
    "unknown": "An unexpected error occurred",
    "retry": "Retry"
  },
  
  "actions": {
    "ok": "OK",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "save": "Save",
    "edit": "Edit",
    "copy": "Copy",
    "share": "Share",
    "close": "Close",
    "done": "Done",
    "back": "Back",
    "next": "Next",
    "refresh": "Refresh",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort"
  },
  
  "messages": {
    "copied": "Copied to clipboard",
    "saved": "Saved successfully",
    "deleted": "Deleted successfully",
    "loading": "Loading...",
    "no_data": "No data available",
    "pull_to_refresh": "Pull to refresh"
  }
}
```

**文件**: `app/i18n/zh.json`
```json
{
  "app": {
    "name": "OrbitRate",
    "tagline": "汇率尽在掌握"
  },
  
  "nav": {
    "convert": "转换",
    "history": "历史",
    "favorites": "收藏",
    "settings": "设置"
  },
  
  "convert": {
    "title": "货币转换",
    "from": "从",
    "to": "到",
    "amount": "金额",
    "result": "结果",
    "rate": "汇率",
    "swap": "交换货币",
    "convert_button": "转换",
    "add_to_favorites": "添加到收藏",
    "placeholder_amount": "请输入金额",
    "updated_at": "更新于 {time}",
    "last_updated": "最后更新: {date}"
  },
  
  "history": {
    "title": "转换历史",
    "empty": "暂无转换记录",
    "empty_subtitle": "您的转换记录将显示在这里",
    "clear_all": "清空全部",
    "clear_confirm": "确定要清空所有历史记录吗？",
    "delete_confirm": "删除此记录？",
    "item_format": "{amount} {from} = {result} {to}",
    "today": "今天",
    "yesterday": "昨天",
    "this_week": "本周",
    "older": "更早"
  },
  
  "favorites": {
    "title": "收藏的货币对",
    "empty": "暂无收藏",
    "empty_subtitle": "添加常用的货币对",
    "add_button": "添加货币对",
    "remove_confirm": "从收藏中移除？",
    "pair_format": "{from} → {to}"
  },
  
  "settings": {
    "title": "设置",
    "language": "语言",
    "language_en": "English",
    "language_zh": "中文",
    "theme": "主题",
    "theme_light": "浅色",
    "theme_dark": "深色",
    "theme_auto": "自动",
    "currency": "默认货币",
    "auto_refresh": "自动刷新",
    "refresh_interval": "刷新间隔",
    "refresh_interval_unit": "{minutes} 分钟",
    "decimal_places": "小数位数",
    "about": "关于",
    "version": "版本",
    "clear_cache": "清除缓存",
    "clear_cache_success": "缓存已清除",
    "export_data": "导出数据",
    "import_data": "导入数据"
  },
  
  "currency": {
    "select": "选择货币",
    "search": "搜索货币...",
    "popular": "热门",
    "all": "所有货币",
    "usd": "美元",
    "eur": "欧元",
    "gbp": "英镑",
    "jpy": "日元",
    "cny": "人民币",
    "cad": "加元",
    "aud": "澳元",
    "chf": "瑞士法郎",
    "hkd": "港币",
    "sgd": "新加坡元"
  },
  
  "errors": {
    "network": "网络错误，请检查您的网络连接",
    "timeout": "请求超时，请重试",
    "api": "获取汇率失败",
    "invalid_amount": "请输入有效金额",
    "unknown": "发生未知错误",
    "retry": "重试"
  },
  
  "actions": {
    "ok": "确定",
    "cancel": "取消",
    "confirm": "确认",
    "delete": "删除",
    "save": "保存",
    "edit": "编辑",
    "copy": "复制",
    "share": "分享",
    "close": "关闭",
    "done": "完成",
    "back": "返回",
    "next": "下一步",
    "refresh": "刷新",
    "search": "搜索",
    "filter": "筛选",
    "sort": "排序"
  },
  
  "messages": {
    "copied": "已复制到剪贴板",
    "saved": "保存成功",
    "deleted": "删除成功",
    "loading": "加载中...",
    "no_data": "暂无数据",
    "pull_to_refresh": "下拉刷新"
  }
}
```

#### Step 4: 创建 i18n 工具

**文件**: `app/utils/i18n.ts`
```typescript
import { localize, overrideLocale } from '@nativescript/localize'
import { ApplicationSettings } from '@nativescript/core'

const LANGUAGE_KEY = 'app_language'

export type SupportedLanguage = 'en' | 'zh'

export class I18nService {
  private currentLanguage: SupportedLanguage

  constructor() {
    this.currentLanguage = this.getSavedLanguage()
  }

  t(key: string, params?: Record<string, string | number>): string {
    let translated = localize(key)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        translated = translated.replace(`{${key}}`, String(value))
      })
    }

    return translated
  }

  setLanguage(language: SupportedLanguage) {
    this.currentLanguage = language
    ApplicationSettings.setString(LANGUAGE_KEY, language)
    overrideLocale(language)
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage
  }

  private getSavedLanguage(): SupportedLanguage {
    const saved = ApplicationSettings.getString(LANGUAGE_KEY) as SupportedLanguage
    return saved || 'en'
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' }
    ]
  }
}

export const i18n = new I18nService()
```

#### Step 5: 创建 Vue 插件

**文件**: `app/plugins/i18n.ts`
```typescript
import { App } from 'vue'
import { i18n } from '~/utils/i18n'

export const I18nPlugin = {
  install(app: App) {
    app.config.globalProperties.$t = (key: string, params?: Record<string, string | number>) => {
      return i18n.t(key, params)
    }

    app.provide('i18n', i18n)
  }
}

// Type augmentation for TypeScript
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, params?: Record<string, string | number>) => string
  }
}
```

#### Step 6: 注册插件

**文件**: `app/app.ts`
```typescript
import { createApp } from 'nativescript-vue'
import { I18nPlugin } from './plugins/i18n'
import Home from './components/Home.vue'

const app = createApp(Home)
app.use(I18nPlugin)
app.start()
```

#### Step 7: 在组件中使用

**示例**: 使用组合式 API
```vue
<template>
  <StackLayout>
    <Label :text="$t('convert.title')" class="title" />
    
    <Label :text="$t('convert.amount')" class="label" />
    <TextField 
      v-model="amount" 
      :hint="$t('convert.placeholder_amount')"
      keyboardType="number"
    />
    
    <Button 
      :text="$t('convert.convert_button')" 
      @tap="handleConvert"
    />
    
    <Label 
      :text="$t('convert.last_updated', { date: formattedDate })"
      class="hint"
    />
  </StackLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { i18n } from '~/utils/i18n'

const formattedDate = computed(() => {
  return new Date().toLocaleString(i18n.getCurrentLanguage())
})
</script>
```

**示例**: 在 TS 文件中使用
```typescript
import { i18n } from '~/utils/i18n'
import { Dialogs } from '@nativescript/core'

export async function showError(message: string) {
  await Dialogs.alert({
    title: i18n.t('errors.unknown'),
    message: message,
    okButtonText: i18n.t('actions.ok')
  })
}
```

### 文本提取清单

需要国际化的文件:
- [ ] `app/components/ConvertView.vue`
- [ ] `app/components/HistoryView.vue`
- [ ] `app/components/FavoritesView.vue`
- [ ] `app/components/SettingsView.vue`
- [ ] `app/components/layout/BottomNavigation.vue`
- [ ] `app/components/CurrencySelector.vue`
- [ ] 所有 Dialogs 提示文本

### 验收标准
- [ ] 所有硬编码文本已提取
- [ ] 中英文翻译完整
- [ ] 语言切换实时生效
- [ ] 参数替换正常工作
- [ ] TypeScript 类型提示完整

---

## 🎯 任务三：国旗组件离线化

### 当前状况

**问题**:
```vue:56:59:app/components/CountryFlag.vue
<!-- 依赖外部 CDN -->
<Image :src="`https://flagcdn.com/w80/${countryCode}.png`" />
```

**痛点**:
- ❌ 需要网络连接
- ❌ 加载速度慢
- ❌ 外部服务不稳定

### 目标

- ✅ 离线可用
- ✅ 快速加载
- ✅ 零网络依赖

### 实施步骤

#### Step 1: 安装依赖

```bash
npm install country-flag-icons
```

#### Step 2: 创建货币-国家映射

**文件**: `app/constants/currency-country-map.ts`
```typescript
export const CURRENCY_TO_COUNTRY: Record<string, string> = {
  // Major currencies
  USD: 'US',
  EUR: 'EU',
  GBP: 'GB',
  JPY: 'JP',
  CNY: 'CN',
  CHF: 'CH',
  CAD: 'CA',
  AUD: 'AU',
  NZD: 'NZ',
  
  // Asian currencies
  HKD: 'HK',
  SGD: 'SG',
  KRW: 'KR',
  THB: 'TH',
  INR: 'IN',
  MYR: 'MY',
  PHP: 'PH',
  IDR: 'ID',
  VND: 'VN',
  
  // European currencies
  SEK: 'SE',
  NOK: 'NO',
  DKK: 'DK',
  PLN: 'PL',
  CZK: 'CZ',
  HUF: 'HU',
  RON: 'RO',
  
  // Middle East & Africa
  AED: 'AE',
  SAR: 'SA',
  ILS: 'IL',
  ZAR: 'ZA',
  EGP: 'EG',
  
  // Americas
  BRL: 'BR',
  MXN: 'MX',
  ARS: 'AR',
  CLP: 'CL',
  COP: 'CO',
  
  // Others
  RUB: 'RU',
  TRY: 'TR',
  PKR: 'PK',
  BDT: 'BD',
  NGN: 'NG'
}

export function getCountryCodeFromCurrency(currency: string): string {
  return CURRENCY_TO_COUNTRY[currency.toUpperCase()] || 'UN' // UN for unknown
}
```

#### Step 3: 使用 Emoji 国旗（方案 A - 推荐）

**文件**: `app/components/CountryFlag.vue`
```vue
<template>
  <Label 
    :text="flagEmoji" 
    :fontSize="size"
    class="flag-emoji"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getCountryCodeFromCurrency } from '~/constants/currency-country-map'

interface Props {
  currency: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24
})

const flagEmoji = computed(() => {
  const countryCode = getCountryCodeFromCurrency(props.currency)
  
  // Convert country code to flag emoji
  // e.g., 'US' -> 🇺🇸
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1F1E6 - 65 + char.charCodeAt(0))
  
  return String.fromCodePoint(...codePoints)
})
</script>

<style scoped>
.flag-emoji {
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji';
}
</style>
```

#### Step 4: 使用本地图片（方案 B - 备选）

**准备资源**:
```bash
# 下载常用国旗图片到 assets
mkdir -p app/assets/flags

# 将国旗 PNG 文件放入此目录
# us.png, cn.png, eu.png, etc.
```

**文件**: `app/components/CountryFlag.vue` (图片版)
```vue
<template>
  <Image 
    :src="flagImage" 
    :width="size" 
    :height="size" 
    stretch="aspectFit"
    class="flag-image"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getCountryCodeFromCurrency } from '~/constants/currency-country-map'

interface Props {
  currency: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 32
})

const flagImage = computed(() => {
  const countryCode = getCountryCodeFromCurrency(props.currency).toLowerCase()
  
  try {
    return require(`~/assets/flags/${countryCode}.png`)
  } catch {
    // Fallback to globe icon if flag not found
    return require('~/assets/flags/default.png')
  }
})
</script>

<style scoped>
.flag-image {
  border-radius: 4;
}
</style>
```

#### Step 5: 性能优化 - 预加载常用国旗

**文件**: `app/services/flag-preloader.ts`
```typescript
import { ImageSource } from '@nativescript/core'
import { getCountryCodeFromCurrency } from '~/constants/currency-country-map'

const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF']

export class FlagPreloader {
  private cache = new Map<string, ImageSource>()

  async preloadFlags() {
    const promises = POPULAR_CURRENCIES.map(async (currency) => {
      const countryCode = getCountryCodeFromCurrency(currency).toLowerCase()
      
      try {
        const source = await ImageSource.fromFile(`~/assets/flags/${countryCode}.png`)
        this.cache.set(currency, source)
      } catch (error) {
        console.warn(`Failed to preload flag for ${currency}`)
      }
    })

    await Promise.all(promises)
  }

  getFlag(currency: string): ImageSource | null {
    return this.cache.get(currency) || null
  }
}

export const flagPreloader = new FlagPreloader()
```

### 验收标准
- [ ] 国旗离线可用
- [ ] 加载速度提升 > 90%
- [ ] 支持所有主要货币
- [ ] 未知货币有默认图标
- [ ] 无网络请求

---

## 🎯 任务四：动画与交互优化

### 目标

- ✅ 添加流畅的动画效果
- ✅ 改善用户交互反馈
- ✅ 提升视觉吸引力

### 实施步骤

#### Step 1: 安装 Lottie

```bash
npm install @nativescript-community/ui-lottie
```

#### Step 2: 准备动画资源

从 [LottieFiles](https://lottiefiles.com/) 下载 JSON 动画:
- `loading.json` - 加载动画
- `success.json` - 成功提示
- `error.json` - 错误提示
- `empty.json` - 空状态

放置在 `app/assets/animations/` 目录

#### Step 3: 创建加载动画组件

**文件**: `app/components/LoadingAnimation.vue`
```vue
<template>
  <GridLayout class="loading-overlay" v-if="visible">
    <StackLayout verticalAlignment="center" horizontalAlignment="center">
      <LottieView 
        :src="animationSource"
        :autoPlay="true"
        :loop="true"
        width="120"
        height="120"
      />
      <Label 
        v-if="message"
        :text="message" 
        class="loading-message"
      />
    </StackLayout>
  </GridLayout>
</template>

<script setup lang="ts">
import { LottieView } from '@nativescript-community/ui-lottie'

interface Props {
  visible: boolean
  message?: string
  animation?: 'loading' | 'success' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  animation: 'loading'
})

const animationSource = computed(() => {
  return require(`~/assets/animations/${props.animation}.json`)
})
</script>

<style scoped>
.loading-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.loading-message {
  color: white;
  font-size: 16;
  margin-top: 16;
}
</style>
```

#### Step 4: 创建空状态组件

**文件**: `app/components/EmptyState.vue`
```vue
<template>
  <StackLayout class="empty-state">
    <LottieView 
      :src="require('~/assets/animations/empty.json')"
      :autoPlay="true"
      :loop="true"
      width="160"
      height="160"
    />
    
    <Label :text="title" class="empty-title" />
    <Label :text="subtitle" class="empty-subtitle" textWrap="true" />
    
    <Button 
      v-if="actionText"
      :text="actionText"
      @tap="$emit('action')"
      class="empty-action"
    />
  </StackLayout>
</template>

<script setup lang="ts">
import { LottieView } from '@nativescript-community/ui-lottie'

interface Props {
  title: string
  subtitle: string
  actionText?: string
}

defineProps<Props>()
defineEmits<{
  action: []
}>()
</script>

<style scoped>
.empty-state {
  padding: 32;
  text-align: center;
}

.empty-title {
  font-size: 20;
  font-weight: bold;
  margin-top: 16;
}

.empty-subtitle {
  font-size: 14;
  color: #94a3b8;
  margin-top: 8;
}

.empty-action {
  margin-top: 24;
}
</style>
```

#### Step 5: 添加页面切换动画

**文件**: `app/utils/navigation.ts`
```typescript
import { Frame } from '@nativescript/core'

export const NavigationAnimations = {
  slideIn: {
    name: 'slideLeft',
    duration: 300,
    curve: 'easeInOut'
  },
  slideOut: {
    name: 'slideRight',
    duration: 300,
    curve: 'easeInOut'
  },
  fadeIn: {
    name: 'fade',
    duration: 200,
    curve: 'easeIn'
  }
}

export function navigateWithAnimation(
  page: any,
  animation: 'slide' | 'fade' = 'slide'
) {
  const frame = Frame.topmost()
  
  frame.navigate({
    create: () => page,
    transition: animation === 'slide' ? NavigationAnimations.slideIn : NavigationAnimations.fadeIn
  })
}
```

#### Step 6: 添加触摸反馈动画

**文件**: `app/components/AnimatedButton.vue`
```vue
<template>
  <GridLayout 
    ref="buttonRef"
    @touch="handleTouch"
    class="animated-button"
  >
    <slot />
  </GridLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GestureTypes, TouchGestureEventData } from '@nativescript/core'

const buttonRef = ref<any>(null)

const emit = defineEmits<{
  tap: []
}>()

const handleTouch = (args: TouchGestureEventData) => {
  const view = args.object
  
  if (args.action === 'down') {
    view.animate({
      scale: { x: 0.95, y: 0.95 },
      duration: 100,
      curve: 'easeOut'
    })
  } else if (args.action === 'up') {
    view.animate({
      scale: { x: 1, y: 1 },
      duration: 100,
      curve: 'easeIn'
    }).then(() => {
      emit('tap')
    })
  } else if (args.action === 'cancel') {
    view.animate({
      scale: { x: 1, y: 1 },
      duration: 100
    })
  }
}
</script>

<style scoped>
.animated-button {
  cursor: pointer;
}
</style>
```

### 应用场景

**加载状态**:
```vue
<LoadingAnimation 
  :visible="isLoading"
  :message="$t('messages.loading')"
/>
```

**空状态**:
```vue
<EmptyState 
  :title="$t('history.empty')"
  :subtitle="$t('history.empty_subtitle')"
  :actionText="$t('convert.convert_button')"
  @action="navigateToConvert"
/>
```

**按钮动画**:
```vue
<AnimatedButton @tap="handleConvert">
  <Label :text="$t('convert.convert_button')" />
</AnimatedButton>
```

### 验收标准
- [ ] 加载动画流畅
- [ ] 空状态显示美观
- [ ] 按钮触摸反馈明显
- [ ] 页面切换有过渡效果
- [ ] 动画不影响性能 (60fps)

---

## 📊 整体验收标准

### 功能完整性
- [ ] 所有图标正常显示并可配置
- [ ] 中英文翻译完整且准确
- [ ] 语言切换实时生效
- [ ] 国旗离线可用且快速加载
- [ ] 动画效果流畅自然

### 性能指标
- [ ] 首屏加载时间 < 1s
- [ ] 语言切换延迟 < 100ms
- [ ] 国旗加载时间 < 50ms
- [ ] 动画帧率 >= 60fps
- [ ] 包体积增加 < 2MB

### 代码质量
- [ ] TypeScript 编译无错误
- [ ] 所有组件有完整类型定义
- [ ] 代码符合 ESLint 规范
- [ ] 无 console 警告或错误

### 用户体验
- [ ] 界面美观现代
- [ ] 交互反馈及时
- [ ] 错误提示友好
- [ ] 无明显卡顿

---

## 📁 交付文件清单

```
app/
├── components/
│   ├── AppIcon.vue (新)
│   ├── CountryFlag.vue (重构)
│   ├── LoadingAnimation.vue (新)
│   ├── EmptyState.vue (新)
│   └── AnimatedButton.vue (新)
├── constants/
│   ├── icons.ts (新)
│   └── currency-country-map.ts (新)
├── i18n/
│   ├── en.json (新)
│   └── zh.json (新)
├── plugins/
│   └── i18n.ts (新)
├── utils/
│   ├── i18n.ts (新)
│   └── navigation.ts (新)
├── assets/
│   ├── animations/ (新目录)
│   │   ├── loading.json
│   │   ├── success.json
│   │   ├── error.json
│   │   └── empty.json
│   └── flags/ (可选，如使用图片方案)
└── types/
    └── icons.ts (新)
```

---

## 🔄 迁移步骤

### Phase 1: 图标系统 (Day 1 上午)
1. 安装 `@nativescript-community/ui-icon`
2. 创建 `AppIcon.vue` 和 `icons.ts`
3. 更新 `BottomNavigation.vue`
4. 测试图标显示

### Phase 2: 国际化 (Day 1 下午 - Day 2)
1. 安装 `@nativescript/localize`
2. 创建语言文件
3. 创建 i18n 工具和插件
4. 逐个组件迁移文本
5. 测试语言切换

### Phase 3: 国旗优化 (Day 2 下午)
1. 创建货币-国家映射
2. 实现 Emoji 国旗方案
3. 替换旧的网络加载方式
4. 测试所有货币显示

### Phase 4: 动画增强 (Day 3)
1. 安装 Lottie
2. 准备动画资源
3. 创建动画组件
4. 在关键页面应用动画
5. 性能测试

---

## ✅ 最终检查清单

- [ ] 所有任务已完成
- [ ] 代码已提交到 Git
- [ ] 已更新 `package.json`
- [ ] 已测试中英文切换
- [ ] 已测试所有动画效果
- [ ] 性能指标达标
- [ ] 已清理临时文件
- [ ] 已更新项目文档

---

**任务负责人**: ___________  
**开始日期**: ___________  
**完成日期**: ___________  
**状态**: [ ] 未开始 / [ ] 进行中 / [ ] 已完成


