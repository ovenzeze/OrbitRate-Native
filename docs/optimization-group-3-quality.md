# 第三组优化任务：质量与性能保障 🔧

**任务组ID**: `OPT-G3-QUALITY`  
**目标**: 建立代码质量保障体系和性能优化  
**预计工作量**: 2-3天  
**优先级**: ⭐⭐⭐⭐⭐  
**核心价值**: 长期可维护性、稳定性和用户体验

---

## 📋 任务总览

| 任务编号 | 任务名称 | 工作量 | 优先级 | 依赖项 |
|---------|---------|--------|--------|--------|
| G3-T1 | 测试框架搭建 | 10h | P0 | 无 |
| G3-T2 | 代码质量工具链 | 4h | P0 | 无 |
| G3-T3 | 数据持久化升级 (SQLite) | 10h | P1 | 无 |
| G3-T4 | 错误处理与监控 | 6h | P0 | 无 |

**总计**: ~30小时

---

## 🎯 任务一：测试框架搭建

### 当前状况

- ❌ 无任何测试
- ❌ 无法保证代码质量
- ❌ 重构风险高

### 目标

- ✅ 建立单元测试框架
- ✅ 核心业务逻辑测试覆盖率 > 60%
- ✅ 集成测试关键流程
- ✅ 自动化测试执行

### 实施步骤

#### Step 1: 安装依赖

```bash
# 测试框架
npm install --save-dev @nativescript/unit-test-runner
npm install --save-dev jasmine
npm install --save-dev @types/jasmine

# Vue 测试工具
npm install --save-dev @vue/test-utils

# 测试覆盖率
npm install --save-dev karma-coverage
```

#### Step 2: 配置测试环境

**文件**: `karma.conf.js`
```javascript
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/**/*.spec.ts'
    ],
    preprocessors: {
      'app/**/*.spec.ts': ['webpack']
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '~': './app'
        }
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  })
}
```

**文件**: `tests/setup.ts`
```typescript
// Global test setup
import 'zone.js'
import 'zone.js/testing'

// Mock NativeScript core
global.console.log = jest.fn()
global.console.warn = jest.fn()
global.console.error = jest.fn()
```

#### Step 3: 编写工具类测试

**文件**: `app/utils/currency-formatter.ts`
```typescript
export class CurrencyFormatter {
  static format(amount: number, currency: string, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  static formatSimple(amount: number, decimalPlaces: number = 2): string {
    return amount.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  static parse(value: string): number {
    const cleaned = value.replace(/[^0-9.-]/g, '')
    return parseFloat(cleaned) || 0
  }
}
```

**文件**: `app/utils/currency-formatter.spec.ts`
```typescript
import { CurrencyFormatter } from './currency-formatter'

describe('CurrencyFormatter', () => {
  describe('format', () => {
    it('should format USD correctly', () => {
      const result = CurrencyFormatter.format(1234.56, 'USD', 'en-US')
      expect(result).toBe('$1,234.56')
    })

    it('should format CNY correctly', () => {
      const result = CurrencyFormatter.format(1234.56, 'CNY', 'zh-CN')
      expect(result).toContain('1,234.56')
    })

    it('should handle zero', () => {
      const result = CurrencyFormatter.format(0, 'USD', 'en-US')
      expect(result).toBe('$0.00')
    })

    it('should handle negative numbers', () => {
      const result = CurrencyFormatter.format(-100, 'USD', 'en-US')
      expect(result).toContain('-')
      expect(result).toContain('100')
    })
  })

  describe('formatSimple', () => {
    it('should format with default 2 decimal places', () => {
      expect(CurrencyFormatter.formatSimple(1234.567)).toBe('1,234.57')
    })

    it('should format with custom decimal places', () => {
      expect(CurrencyFormatter.formatSimple(1234.567, 4)).toBe('1,234.5670')
    })

    it('should add thousand separators', () => {
      expect(CurrencyFormatter.formatSimple(1234567.89)).toBe('1,234,567.89')
    })
  })

  describe('parse', () => {
    it('should parse formatted currency', () => {
      expect(CurrencyFormatter.parse('$1,234.56')).toBe(1234.56)
    })

    it('should parse plain numbers', () => {
      expect(CurrencyFormatter.parse('1234.56')).toBe(1234.56)
    })

    it('should handle invalid input', () => {
      expect(CurrencyFormatter.parse('abc')).toBe(0)
    })

    it('should handle negative numbers', () => {
      expect(CurrencyFormatter.parse('-$100.50')).toBe(-100.50)
    })
  })
})
```

**文件**: `app/utils/rate-calculator.ts`
```typescript
export class RateCalculator {
  static convert(amount: number, rate: number): number {
    return amount * rate
  }

  static reverseConvert(result: number, rate: number): number {
    if (rate === 0) {
      throw new Error('Rate cannot be zero')
    }
    return result / rate
  }

  static calculatePercentageChange(oldRate: number, newRate: number): number {
    if (oldRate === 0) {
      throw new Error('Old rate cannot be zero')
    }
    return ((newRate - oldRate) / oldRate) * 100
  }

  static crossRate(rate1: number, rate2: number): number {
    if (rate2 === 0) {
      throw new Error('Rate2 cannot be zero')
    }
    return rate1 / rate2
  }

  static roundToDecimals(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals)
    return Math.round(value * factor) / factor
  }
}
```

**文件**: `app/utils/rate-calculator.spec.ts`
```typescript
import { RateCalculator } from './rate-calculator'

describe('RateCalculator', () => {
  describe('convert', () => {
    it('should convert amount correctly', () => {
      expect(RateCalculator.convert(100, 7.2)).toBe(720)
    })

    it('should handle zero amount', () => {
      expect(RateCalculator.convert(0, 7.2)).toBe(0)
    })

    it('should handle decimal rates', () => {
      expect(RateCalculator.convert(100, 0.85)).toBe(85)
    })
  })

  describe('reverseConvert', () => {
    it('should reverse convert correctly', () => {
      expect(RateCalculator.reverseConvert(720, 7.2)).toBe(100)
    })

    it('should throw error for zero rate', () => {
      expect(() => RateCalculator.reverseConvert(100, 0)).toThrow('Rate cannot be zero')
    })
  })

  describe('calculatePercentageChange', () => {
    it('should calculate positive change', () => {
      expect(RateCalculator.calculatePercentageChange(100, 110)).toBe(10)
    })

    it('should calculate negative change', () => {
      expect(RateCalculator.calculatePercentageChange(100, 90)).toBe(-10)
    })

    it('should throw error for zero old rate', () => {
      expect(() => RateCalculator.calculatePercentageChange(0, 100)).toThrow('Old rate cannot be zero')
    })
  })

  describe('crossRate', () => {
    it('should calculate cross rate', () => {
      expect(RateCalculator.crossRate(7.2, 0.85)).toBeCloseTo(8.47, 2)
    })

    it('should throw error for zero rate2', () => {
      expect(() => RateCalculator.crossRate(7.2, 0)).toThrow('Rate2 cannot be zero')
    })
  })

  describe('roundToDecimals', () => {
    it('should round to 2 decimals', () => {
      expect(RateCalculator.roundToDecimals(1.2345, 2)).toBe(1.23)
    })

    it('should round to 4 decimals', () => {
      expect(RateCalculator.roundToDecimals(1.23456789, 4)).toBe(1.2346)
    })

    it('should handle negative numbers', () => {
      expect(RateCalculator.roundToDecimals(-1.2345, 2)).toBe(-1.23)
    })
  })
})
```

#### Step 4: 编写服务层测试

**文件**: `app/services/core/cache.service.spec.ts`
```typescript
import { CacheService } from './cache.service'

describe('CacheService', () => {
  let cacheService: CacheService

  beforeEach(() => {
    cacheService = new CacheService()
  })

  afterEach(() => {
    cacheService.clear()
  })

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      cacheService.set('test-key', { value: 'test' }, 60)
      const result = cacheService.get('test-key')
      
      expect(result).toEqual({ value: 'test' })
    })

    it('should return null for non-existent key', () => {
      const result = cacheService.get('non-existent')
      expect(result).toBeNull()
    })

    it('should handle different data types', () => {
      cacheService.set('string', 'test', 60)
      cacheService.set('number', 123, 60)
      cacheService.set('object', { a: 1 }, 60)
      cacheService.set('array', [1, 2, 3], 60)

      expect(cacheService.get('string')).toBe('test')
      expect(cacheService.get('number')).toBe(123)
      expect(cacheService.get('object')).toEqual({ a: 1 })
      expect(cacheService.get('array')).toEqual([1, 2, 3])
    })
  })

  describe('expiration', () => {
    it('should expire data after TTL', (done) => {
      cacheService.set('expire-test', 'value', 0.01) // 0.6 seconds

      setTimeout(() => {
        const result = cacheService.get('expire-test')
        expect(result).toBeNull()
        done()
      }, 700)
    })

    it('should not expire before TTL', () => {
      cacheService.set('fresh-test', 'value', 60)
      const result = cacheService.get('fresh-test')
      expect(result).toBe('value')
    })
  })

  describe('has', () => {
    it('should return true for existing key', () => {
      cacheService.set('key', 'value', 60)
      expect(cacheService.has('key')).toBe(true)
    })

    it('should return false for non-existent key', () => {
      expect(cacheService.has('non-existent')).toBe(false)
    })

    it('should return false for expired key', (done) => {
      cacheService.set('expire', 'value', 0.01)

      setTimeout(() => {
        expect(cacheService.has('expire')).toBe(false)
        done()
      }, 700)
    })
  })

  describe('delete', () => {
    it('should delete existing key', () => {
      cacheService.set('key', 'value', 60)
      cacheService.delete('key')
      expect(cacheService.has('key')).toBe(false)
    })
  })

  describe('clear', () => {
    it('should clear all entries', () => {
      cacheService.set('key1', 'value1', 60)
      cacheService.set('key2', 'value2', 60)
      
      cacheService.clear()
      
      expect(cacheService.has('key1')).toBe(false)
      expect(cacheService.has('key2')).toBe(false)
    })
  })

  describe('clearExpired', () => {
    it('should only clear expired entries', (done) => {
      cacheService.set('expired', 'value1', 0.01)
      cacheService.set('fresh', 'value2', 60)

      setTimeout(() => {
        cacheService.clearExpired()
        
        expect(cacheService.has('expired')).toBe(false)
        expect(cacheService.has('fresh')).toBe(true)
        done()
      }, 700)
    })
  })

  describe('getStats', () => {
    it('should return cache statistics', () => {
      cacheService.set('key1', 'value1', 60)
      cacheService.set('key2', 'value2', 60)
      
      const stats = cacheService.getStats()
      
      expect(stats.totalEntries).toBe(2)
      expect(stats.entries).toContain('key1')
      expect(stats.entries).toContain('key2')
    })
  })
})
```

#### Step 5: 编写 Store 测试

**文件**: `app/stores/currency.spec.ts`
```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useCurrencyStore } from './currency'

// Mock API
jest.mock('~/services/api/exchange-rate.api')

describe('Currency Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have default state', () => {
    const store = useCurrencyStore()

    expect(store.fromCurrency).toBe('USD')
    expect(store.toCurrency).toBe('CNY')
    expect(store.amount).toBe(100)
    expect(store.currentRate).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('should calculate converted amount', () => {
    const store = useCurrencyStore()
    store.amount = 100
    store.currentRate = 7.2

    expect(store.convertedAmount).toBe(720)
  })

  it('should return 0 when rate is null', () => {
    const store = useCurrencyStore()
    store.amount = 100
    store.currentRate = null

    expect(store.convertedAmount).toBe(0)
  })

  it('should set amount correctly', () => {
    const store = useCurrencyStore()
    store.setAmount(500)

    expect(store.amount).toBe(500)
  })

  it('should not allow negative amounts', () => {
    const store = useCurrencyStore()
    store.setAmount(-100)

    expect(store.amount).toBe(0)
  })

  it('should swap currencies', () => {
    const store = useCurrencyStore()
    store.fromCurrency = 'USD'
    store.toCurrency = 'CNY'

    store.swapCurrencies()

    expect(store.fromCurrency).toBe('CNY')
    expect(store.toCurrency).toBe('USD')
  })

  it('should detect stale rates', () => {
    const store = useCurrencyStore()
    
    // No update yet
    expect(store.isRateStale).toBe(true)

    // Recent update
    store.lastUpdated = new Date()
    expect(store.isRateStale).toBe(false)

    // Old update (2 hours ago)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
    store.lastUpdated = twoHoursAgo
    expect(store.isRateStale).toBe(true)
  })
})
```

#### Step 6: 配置测试脚本

**文件**: `package.json`
```json
{
  "scripts": {
    "test": "karma start --single-run",
    "test:watch": "karma start",
    "test:coverage": "karma start --single-run --reporters coverage",
    "test:unit": "jest app/**/*.spec.ts",
    "test:unit:watch": "jest app/**/*.spec.ts --watch"
  },
  "jest": {
    "preset": "@nativescript/unit-test-runner/jest-preset",
    "testMatch": [
      "**/?(*.)+(spec|test).ts"
    ],
    "moduleNameMapper": {
      "^~/(.*)$": "<rootDir>/app/$1"
    },
    "collectCoverageFrom": [
      "app/**/*.ts",
      "!app/**/*.spec.ts",
      "!app/**/*.d.ts"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 60,
        "functions": 60,
        "lines": 60,
        "statements": 60
      }
    }
  }
}
```

### 测试优先级清单

**高优先级** (必须测试):
- [ ] `app/utils/currency-formatter.ts`
- [ ] `app/utils/rate-calculator.ts`
- [ ] `app/services/core/cache.service.ts`
- [ ] `app/services/core/http.service.ts`
- [ ] `app/stores/currency.ts`

**中优先级**:
- [ ] `app/stores/history.ts`
- [ ] `app/stores/favorites.ts`
- [ ] `app/services/api/exchange-rate.api.ts`
- [ ] `app/services/storage/*.ts`

**低优先级**:
- [ ] 组件测试 (可选)
- [ ] E2E 测试 (未来)

### 验收标准
- [ ] 测试框架正常运行
- [ ] 核心工具类测试覆盖率 100%
- [ ] 服务层测试覆盖率 > 80%
- [ ] Store 测试覆盖率 > 70%
- [ ] 总体覆盖率 > 60%
- [ ] 所有测试通过

---

## 🎯 任务二：代码质量工具链

### 目标

- ✅ 统一代码风格
- ✅ 自动化代码检查
- ✅ Git 提交前验证
- ✅ 提升代码可读性

### 实施步骤

#### Step 1: 安装依赖

```bash
# ESLint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-plugin-vue

# Prettier
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Git hooks
npm install --save-dev husky lint-staged
```

#### Step 2: 配置 ESLint

**文件**: `.eslintrc.js`
```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    // TypeScript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // Vue rules
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-unused-components': 'warn',

    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }]
  },
  ignorePatterns: [
    'node_modules/',
    'platforms/',
    'hooks/',
    'dist/',
    'coverage/',
    '*.d.ts'
  ]
}
```

#### Step 3: 配置 Prettier

**文件**: `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "vueIndentScriptAndStyle": false
}
```

**文件**: `.prettierignore`
```
node_modules/
platforms/
hooks/
dist/
coverage/
*.min.js
*.md
package-lock.json
```

#### Step 4: 配置 Husky

```bash
# 初始化 Husky
npx husky-init && npm install
```

**文件**: `.husky/pre-commit`
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged
```

**文件**: `.husky/commit-msg`
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format
npm run validate-commit-msg
```

#### Step 5: 配置 lint-staged

**文件**: `package.json`
```json
{
  "lint-staged": {
    "*.{ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "lint": "eslint app/**/*.{ts,vue} --max-warnings 0",
    "lint:fix": "eslint app/**/*.{ts,vue} --fix",
    "format": "prettier --write \"app/**/*.{ts,vue,json}\"",
    "format:check": "prettier --check \"app/**/*.{ts,vue,json}\"",
    "lint-staged": "lint-staged",
    "validate-commit-msg": "node scripts/validate-commit-msg.js"
  }
}
```

#### Step 6: 创建提交信息验证脚本

**文件**: `scripts/validate-commit-msg.js`
```javascript
const fs = require('fs')
const path = require('path')

const commitMsgFile = path.join(__dirname, '../.git/COMMIT_EDITMSG')
const commitMsg = fs.readFileSync(commitMsgFile, 'utf-8').trim()

// Commit message format: <type>: <subject>
const commitRE = /^(feat|fix|docs|style|refactor|test|chore):\s.{1,100}/

if (!commitRE.test(commitMsg)) {
  console.error(`
  ❌ Invalid commit message format.
  
  Commit message must follow the format:
  <type>: <subject>
  
  Types:
  - feat:     New feature
  - fix:      Bug fix
  - docs:     Documentation changes
  - style:    Code style changes (formatting, etc.)
  - refactor: Code refactoring
  - test:     Adding or updating tests
  - chore:    Maintenance tasks
  
  Example:
  feat: add currency favorites feature
  fix: resolve exchange rate caching issue
  
  Your commit message:
  ${commitMsg}
  `)
  process.exit(1)
}

console.log('✅ Commit message format is valid')
```

#### Step 7: 配置 TypeScript 严格模式

**文件**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    
    // Strict mode
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // Additional checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    // Path mapping
    "baseUrl": ".",
    "paths": {
      "~/*": ["app/*"],
      "@/*": ["app/*"]
    },
    
    "types": ["node", "@nativescript/types"]
  },
  "include": ["app/**/*"],
  "exclude": ["node_modules", "platforms", "**/*.spec.ts"]
}
```

### 代码审查检查清单

创建 `.github/pull_request_template.md`:
```markdown
## 📝 变更描述

<!-- 简要描述此 PR 的变更内容 -->

## 🎯 变更类型

- [ ] feat: 新功能
- [ ] fix: Bug 修复
- [ ] docs: 文档更新
- [ ] style: 代码格式调整
- [ ] refactor: 代码重构
- [ ] test: 测试相关
- [ ] chore: 构建/工具链

## ✅ 检查清单

- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 Prettier 格式化
- [ ] TypeScript 编译无错误
- [ ] 新增代码有对应测试
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 提交信息符合规范

## 🧪 测试说明

<!-- 描述如何测试此变更 -->

## 📸 截图 (如适用)

<!-- 添加相关截图 -->

## 📚 相关 Issue

Closes #
```

### 验收标准
- [ ] ESLint 配置生效
- [ ] Prettier 格式化正常
- [ ] Pre-commit hook 工作
- [ ] Commit message 验证生效
- [ ] 现有代码通过 lint 检查
- [ ] TypeScript 严格模式无错误

---

## 🎯 任务三：数据持久化升级 (SQLite)

### 当前状况

**问题**:
```typescript
// 使用 ApplicationSettings 存储 JSON
ApplicationSettings.setString('history', JSON.stringify(records))
```

**痛点**:
- ❌ 无法查询
- ❌ 性能差
- ❌ 无事务支持
- ❌ 无数据迁移机制

### 目标

- ✅ 使用 SQLite 数据库
- ✅ 结构化查询
- ✅ 事务支持
- ✅ 数据迁移机制

### 实施步骤

#### Step 1: 安装依赖

```bash
npm install @nativescript/sqlite
```

#### Step 2: 创建数据库服务

**文件**: `app/services/database/database.service.ts`
```typescript
import { Sqlite } from '@nativescript/sqlite'
import { logger } from '~/services/core/logger.service'

export class DatabaseService {
  private db: any = null
  private readonly DB_NAME = 'orbitrate.db'
  private readonly DB_VERSION = 1

  async init(): Promise<void> {
    try {
      this.db = await new Sqlite(this.DB_NAME)
      await this.createTables()
      await this.migrate()
      logger.info('Database initialized', 'DatabaseService')
    } catch (error) {
      logger.error('Failed to initialize database', 'DatabaseService', error)
      throw error
    }
  }

  private async createTables(): Promise<void> {
    // Conversion history table
    await this.db.execSQL(`
      CREATE TABLE IF NOT EXISTS conversion_history (
        id TEXT PRIMARY KEY,
        from_currency TEXT NOT NULL,
        to_currency TEXT NOT NULL,
        amount REAL NOT NULL,
        result REAL NOT NULL,
        rate REAL NOT NULL,
        created_at INTEGER NOT NULL
      )
    `)

    // Create index for faster queries
    await this.db.execSQL(`
      CREATE INDEX IF NOT EXISTS idx_history_created_at 
      ON conversion_history(created_at DESC)
    `)

    await this.db.execSQL(`
      CREATE INDEX IF NOT EXISTS idx_history_currencies 
      ON conversion_history(from_currency, to_currency)
    `)

    // Favorites table
    await this.db.execSQL(`
      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        from_currency TEXT NOT NULL,
        to_currency TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    `)

    // Metadata table for migrations
    await this.db.execSQL(`
      CREATE TABLE IF NOT EXISTS db_metadata (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `)

    logger.info('Database tables created', 'DatabaseService')
  }

  private async migrate(): Promise<void> {
    const currentVersion = await this.getDbVersion()

    if (currentVersion < this.DB_VERSION) {
      logger.info(`Migrating database from v${currentVersion} to v${this.DB_VERSION}`, 'DatabaseService')
      
      // Run migrations
      for (let version = currentVersion + 1; version <= this.DB_VERSION; version++) {
        await this.runMigration(version)
      }

      await this.setDbVersion(this.DB_VERSION)
    }
  }

  private async runMigration(version: number): Promise<void> {
    switch (version) {
      case 1:
        // Initial version, no migration needed
        break
      // Future migrations go here
      // case 2:
      //   await this.db.execSQL('ALTER TABLE ...')
      //   break
    }
  }

  private async getDbVersion(): Promise<number> {
    try {
      const result = await this.db.get('SELECT value FROM db_metadata WHERE key = ?', ['version'])
      return result ? parseInt(result[0], 10) : 0
    } catch {
      return 0
    }
  }

  private async setDbVersion(version: number): Promise<void> {
    await this.db.execSQL(
      'INSERT OR REPLACE INTO db_metadata (key, value) VALUES (?, ?)',
      ['version', version.toString()]
    )
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close()
      this.db = null
    }
  }

  getDatabase(): any {
    if (!this.db) {
      throw new Error('Database not initialized')
    }
    return this.db
  }
}

// Singleton instance
export const databaseService = new DatabaseService()
```

#### Step 3: 创建历史记录仓库

**文件**: `app/services/database/history.repository.ts`
```typescript
import { databaseService } from './database.service'
import { ConversionRecord } from '~/types'
import { logger } from '~/services/core/logger.service'

export class HistoryRepository {
  async getAll(limit: number = 100): Promise<ConversionRecord[]> {
    try {
      const db = databaseService.getDatabase()
      const rows = await db.all(
        'SELECT * FROM conversion_history ORDER BY created_at DESC LIMIT ?',
        [limit]
      )

      return rows.map(this.mapRowToRecord)
    } catch (error) {
      logger.error('Failed to get history', 'HistoryRepository', error)
      return []
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ConversionRecord[]> {
    try {
      const db = databaseService.getDatabase()
      const rows = await db.all(
        `SELECT * FROM conversion_history 
         WHERE created_at BETWEEN ? AND ? 
         ORDER BY created_at DESC`,
        [startDate.getTime(), endDate.getTime()]
      )

      return rows.map(this.mapRowToRecord)
    } catch (error) {
      logger.error('Failed to get history by date', 'HistoryRepository', error)
      return []
    }
  }

  async getByCurrencyPair(fromCurrency: string, toCurrency: string): Promise<ConversionRecord[]> {
    try {
      const db = databaseService.getDatabase()
      const rows = await db.all(
        `SELECT * FROM conversion_history 
         WHERE from_currency = ? AND to_currency = ? 
         ORDER BY created_at DESC`,
        [fromCurrency, toCurrency]
      )

      return rows.map(this.mapRowToRecord)
    } catch (error) {
      logger.error('Failed to get history by pair', 'HistoryRepository', error)
      return []
    }
  }

  async insert(record: ConversionRecord): Promise<void> {
    try {
      const db = databaseService.getDatabase()
      await db.execSQL(
        `INSERT INTO conversion_history 
         (id, from_currency, to_currency, amount, result, rate, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          record.id,
          record.from_currency,
          record.to_currency,
          record.amount,
          record.result,
          record.rate,
          record.created_at.getTime()
        ]
      )

      logger.info('Inserted history record', 'HistoryRepository', { id: record.id })
    } catch (error) {
      logger.error('Failed to insert history', 'HistoryRepository', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const db = databaseService.getDatabase()
      await db.execSQL('DELETE FROM conversion_history WHERE id = ?', [id])
      logger.info('Deleted history record', 'HistoryRepository', { id })
    } catch (error) {
      logger.error('Failed to delete history', 'HistoryRepository', error)
      throw error
    }
  }

  async deleteAll(): Promise<void> {
    try {
      const db = databaseService.getDatabase()
      await db.execSQL('DELETE FROM conversion_history')
      logger.info('Cleared all history', 'HistoryRepository')
    } catch (error) {
      logger.error('Failed to clear history', 'HistoryRepository', error)
      throw error
    }
  }

  async getCount(): Promise<number> {
    try {
      const db = databaseService.getDatabase()
      const result = await db.get('SELECT COUNT(*) as count FROM conversion_history')
      return result ? result[0] : 0
    } catch (error) {
      logger.error('Failed to get history count', 'HistoryRepository', error)
      return 0
    }
  }

  private mapRowToRecord(row: any): ConversionRecord {
    return {
      id: row[0],
      from_currency: row[1],
      to_currency: row[2],
      amount: row[3],
      result: row[4],
      rate: row[5],
      created_at: new Date(row[6])
    }
  }
}

export const historyRepository = new HistoryRepository()
```

#### Step 4: 创建收藏夹仓库

**文件**: `app/services/database/favorites.repository.ts`
```typescript
import { databaseService } from './database.service'
import { FavoriteItem } from '~/types'
import { logger } from '~/services/core/logger.service'

export class FavoritesRepository {
  async getAll(): Promise<FavoriteItem[]> {
    try {
      const db = databaseService.getDatabase()
      const rows = await db.all('SELECT * FROM favorites ORDER BY created_at DESC')

      return rows.map(this.mapRowToItem)
    } catch (error) {
      logger.error('Failed to get favorites', 'FavoritesRepository', error)
      return []
    }
  }

  async insert(item: FavoriteItem): Promise<void> {
    try {
      const db = databaseService.getDatabase()
      await db.execSQL(
        `INSERT INTO favorites 
         (id, type, from_currency, to_currency, created_at) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          item.id,
          item.type,
          item.data.from_currency,
          item.data.to_currency,
          item.created_at.getTime()
        ]
      )

      logger.info('Inserted favorite', 'FavoritesRepository', { id: item.id })
    } catch (error) {
      logger.error('Failed to insert favorite', 'FavoritesRepository', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const db = databaseService.getDatabase()
      await db.execSQL('DELETE FROM favorites WHERE id = ?', [id])
      logger.info('Deleted favorite', 'FavoritesRepository', { id })
    } catch (error) {
      logger.error('Failed to delete favorite', 'FavoritesRepository', error)
      throw error
    }
  }

  async exists(fromCurrency: string, toCurrency: string): Promise<boolean> {
    try {
      const db = databaseService.getDatabase()
      const result = await db.get(
        'SELECT COUNT(*) as count FROM favorites WHERE from_currency = ? AND to_currency = ?',
        [fromCurrency, toCurrency]
      )
      return result ? result[0] > 0 : false
    } catch (error) {
      logger.error('Failed to check favorite existence', 'FavoritesRepository', error)
      return false
    }
  }

  private mapRowToItem(row: any): FavoriteItem {
    return {
      id: row[0],
      type: row[1] as 'pair',
      data: {
        from_currency: row[2],
        to_currency: row[3]
      },
      created_at: new Date(row[4])
    }
  }
}

export const favoritesRepository = new FavoritesRepository()
```

#### Step 5: 数据迁移工具

**文件**: `app/services/database/migration.service.ts`
```typescript
import { ApplicationSettings } from '@nativescript/core'
import { historyRepository } from './history.repository'
import { favoritesRepository } from './favorites.repository'
import { logger } from '~/services/core/logger.service'

export class MigrationService {
  async migrateFromApplicationSettings(): Promise<void> {
    logger.info('Starting migration from ApplicationSettings', 'MigrationService')

    try {
      // Migrate history
      const historyData = ApplicationSettings.getString('conversion_history')
      if (historyData) {
        const records = JSON.parse(historyData)
        for (const record of records) {
          await historyRepository.insert({
            ...record,
            created_at: new Date(record.created_at)
          })
        }
        logger.info(`Migrated ${records.length} history records`, 'MigrationService')
        ApplicationSettings.remove('conversion_history')
      }

      // Migrate favorites
      const favoritesData = ApplicationSettings.getString('favorites')
      if (favoritesData) {
        const favorites = JSON.parse(favoritesData)
        for (const favorite of favorites) {
          await favoritesRepository.insert({
            ...favorite,
            created_at: new Date(favorite.created_at)
          })
        }
        logger.info(`Migrated ${favorites.length} favorites`, 'MigrationService')
        ApplicationSettings.remove('favorites')
      }

      // Mark migration as complete
      ApplicationSettings.setBoolean('db_migration_complete', true)
      logger.info('Migration completed successfully', 'MigrationService')
    } catch (error) {
      logger.error('Migration failed', 'MigrationService', error)
      throw error
    }
  }

  isMigrationComplete(): boolean {
    return ApplicationSettings.getBoolean('db_migration_complete', false)
  }
}

export const migrationService = new MigrationService()
```

#### Step 6: 应用启动时初始化

**文件**: `app/app.ts`
```typescript
import { Application } from '@nativescript/core'
import { createApp } from 'nativescript-vue'
import { databaseService } from './services/database/database.service'
import { migrationService } from './services/database/migration.service'
import Home from './components/Home.vue'

async function bootstrap() {
  // Initialize database
  await databaseService.init()

  // Migrate data if needed
  if (!migrationService.isMigrationComplete()) {
    await migrationService.migrateFromApplicationSettings()
  }

  // Start app
  const app = createApp(Home)
  app.start()
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap app:', error)
})
```

### 验收标准
- [ ] SQLite 数据库初始化成功
- [ ] 历史记录可以 CRUD
- [ ] 收藏夹可以 CRUD
- [ ] 查询性能 < 100ms
- [ ] 数据迁移成功
- [ ] 事务处理正常

---

## 🎯 任务四：错误处理与监控

### 目标

- ✅ 统一错误处理机制
- ✅ 用户友好的错误提示
- ✅ 错误日志记录
- ✅ 性能监控 (可选)

### 实施步骤

#### Step 1: 创建错误处理服务

**文件**: `app/services/core/error-handler.ts`
```typescript
import { Dialogs } from '@nativescript/core'
import { logger } from './logger.service'
import { i18n } from '~/utils/i18n'

export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  DATABASE = 'DATABASE',
  UNKNOWN = 'UNKNOWN'
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ErrorHandler {
  static async handle(error: Error | AppError, context?: string): Promise<void> {
    // Log error
    logger.error(`Error in ${context || 'unknown'}`, 'ErrorHandler', {
      message: error.message,
      stack: error.stack
    })

    // Determine error type
    let errorType = ErrorType.UNKNOWN
    let errorMessage = error.message

    if (error instanceof AppError) {
      errorType = error.type
    } else if (this.isNetworkError(error)) {
      errorType = ErrorType.NETWORK
      errorMessage = i18n.t('errors.network')
    } else if (this.isApiError(error)) {
      errorType = ErrorType.API
      errorMessage = i18n.t('errors.api')
    } else if (this.isValidationError(error)) {
      errorType = ErrorType.VALIDATION
    }

    // Show user-friendly error
    await this.showErrorDialog(errorType, errorMessage)
  }

  private static async showErrorDialog(type: ErrorType, message: string): Promise<void> {
    const title = this.getErrorTitle(type)
    
    await Dialogs.alert({
      title,
      message,
      okButtonText: i18n.t('actions.ok')
    })
  }

  private static getErrorTitle(type: ErrorType): string {
    switch (type) {
      case ErrorType.NETWORK:
        return i18n.t('errors.network')
      case ErrorType.API:
        return i18n.t('errors.api')
      case ErrorType.VALIDATION:
        return i18n.t('errors.invalid_amount')
      case ErrorType.DATABASE:
        return 'Database Error'
      default:
        return i18n.t('errors.unknown')
    }
  }

  private static isNetworkError(error: Error): boolean {
    return (
      error.message.includes('network') ||
      error.message.includes('timeout') ||
      error.message.includes('offline') ||
      error.message.includes('connection')
    )
  }

  private static isApiError(error: Error): boolean {
    return (
      error.message.includes('API') ||
      error.message.includes('HTTP') ||
      error.message.includes('status')
    )
  }

  private static isValidationError(error: Error): boolean {
    return (
      error.message.includes('validation') ||
      error.message.includes('invalid') ||
      error.message.includes('required')
    )
  }

  static async confirm(message: string, title?: string): Promise<boolean> {
    return await Dialogs.confirm({
      title: title || i18n.t('actions.confirm'),
      message,
      okButtonText: i18n.t('actions.ok'),
      cancelButtonText: i18n.t('actions.cancel')
    })
  }

  static async showSuccess(message: string): Promise<void> {
    await Dialogs.alert({
      title: '✅ Success',
      message,
      okButtonText: i18n.t('actions.ok')
    })
  }
}
```

#### Step 2: 全局错误捕获

**文件**: `app/utils/global-error-handler.ts`
```typescript
import { Application } from '@nativescript/core'
import { ErrorHandler } from '~/services/core/error-handler'

export function setupGlobalErrorHandler() {
  // Catch uncaught errors
  Application.on(Application.uncaughtErrorEvent, (args) => {
    const error = args.error as Error
    ErrorHandler.handle(error, 'UncaughtError')
    
    // Prevent app crash
    args.android?.defaultPrevented()
  })

  // Catch unhandled promise rejections
  global.addEventListener?.('unhandledrejection', (event: any) => {
    const error = event.reason instanceof Error ? event.reason : new Error(event.reason)
    ErrorHandler.handle(error, 'UnhandledRejection')
  })
}
```

#### Step 3: 在 App 中注册

**文件**: `app/app.ts`
```typescript
import { setupGlobalErrorHandler } from './utils/global-error-handler'

// Setup error handling
setupGlobalErrorHandler()
```

#### Step 4: 使用示例

**在组件中**:
```vue
<script setup lang="ts">
import { ErrorHandler, AppError, ErrorType } from '~/services/core/error-handler'
import { useCurrencyStore } from '~/stores/currency'

const currencyStore = useCurrencyStore()

const handleConvert = async () => {
  try {
    // Validation
    if (currencyStore.amount <= 0) {
      throw new AppError(
        ErrorType.VALIDATION,
        i18n.t('errors.invalid_amount')
      )
    }

    await currencyStore.fetchRates()
  } catch (error) {
    await ErrorHandler.handle(error as Error, 'ConvertView.handleConvert')
  }
}

const handleDelete = async (id: string) => {
  const confirmed = await ErrorHandler.confirm(
    i18n.t('history.delete_confirm')
  )

  if (confirmed) {
    try {
      await historyStore.removeRecord(id)
      await ErrorHandler.showSuccess(i18n.t('messages.deleted'))
    } catch (error) {
      await ErrorHandler.handle(error as Error, 'ConvertView.handleDelete')
    }
  }
}
</script>
```

**在服务中**:
```typescript
import { AppError, ErrorType } from '~/services/core/error-handler'

export class ExchangeRateAPI {
  async getRates(baseCurrency: string): Promise<ExchangeRateResponse> {
    try {
      const data = await this.http.get<ExchangeRateResponse>(baseCurrency)
      return data
    } catch (error) {
      throw new AppError(
        ErrorType.API,
        'Failed to fetch exchange rates',
        error as Error
      )
    }
  }
}
```

### 验收标准
- [ ] 全局错误捕获生效
- [ ] 错误分类正确
- [ ] 用户提示友好
- [ ] 错误日志完整
- [ ] 应用不会因错误崩溃

---

## 📊 整体验收标准

### 测试完整性
- [ ] 核心工具类测试覆盖率 100%
- [ ] 服务层测试覆盖率 > 80%
- [ ] Store 测试覆盖率 > 70%
- [ ] 总体测试覆盖率 > 60%

### 代码质量
- [ ] ESLint 零警告
- [ ] Prettier 格式统一
- [ ] TypeScript 严格模式通过
- [ ] Pre-commit hooks 正常工作

### 数据库
- [ ] SQLite 初始化成功
- [ ] 数据迁移完成
- [ ] CRUD 操作正常
- [ ] 查询性能达标

### 错误处理
- [ ] 统一错误处理机制
- [ ] 用户提示友好
- [ ] 错误日志完整
- [ ] 应用稳定性提升

---

## 📁 交付文件清单

```
├── tests/
│   ├── setup.ts
│   └── unit/
│       ├── utils/
│       │   ├── currency-formatter.spec.ts
│       │   └── rate-calculator.spec.ts
│       ├── services/
│       │   └── core/
│       │       └── cache.service.spec.ts
│       └── stores/
│           └── currency.spec.ts
├── app/
│   ├── services/
│   │   ├── database/
│   │   │   ├── database.service.ts
│   │   │   ├── history.repository.ts
│   │   │   ├── favorites.repository.ts
│   │   │   └── migration.service.ts
│   │   └── core/
│   │       └── error-handler.ts
│   └── utils/
│       ├── currency-formatter.ts
│       ├── rate-calculator.ts
│       └── global-error-handler.ts
├── scripts/
│   └── validate-commit-msg.js
├── .eslintrc.js
├── .prettierrc
├── .prettierignore
├── karma.conf.js
└── .husky/
    ├── pre-commit
    └── commit-msg
```

---

## ✅ 最终检查清单

- [ ] 所有任务已完成
- [ ] 测试框架正常运行
- [ ] 所有测试通过
- [ ] 代码质量工具正常工作
- [ ] SQLite 数据库集成完成
- [ ] 错误处理机制完善
- [ ] 代码已提交到 Git
- [ ] 已更新项目文档

---

**任务负责人**: ___________  
**开始日期**: ___________  
**完成日期**: ___________  
**状态**: [ ] 未开始 / [ ] 进行中 / [ ] 已完成


