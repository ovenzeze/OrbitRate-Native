# Developer Quick Start Guide

## Project Structure

```
app/
├── stores/           # Pinia state management
│   ├── currency.ts   # Currency conversion state
│   ├── history.ts    # Conversion history
│   ├── favorites.ts  # Favorite pairs
│   └── settings.ts   # App settings
├── services/
│   ├── core/         # Core infrastructure
│   │   ├── http.service.ts
│   │   ├── cache.service.ts
│   │   └── logger.service.ts
│   ├── api/          # External APIs
│   │   ├── exchange-rate.api.ts
│   │   └── currency-info.api.ts
│   ├── storage/      # Local persistence
│   │   ├── history.storage.ts
│   │   ├── favorites.storage.ts
│   │   └── settings.storage.ts
│   └── utils/        # Utility functions
│       ├── currency-formatter.ts
│       └── rate-calculator.ts
├── types/            # TypeScript definitions
│   ├── index.ts      # Core types
│   └── navigation.ts # Navigation types
├── views/            # Page components
├── components/       # Reusable components
└── app.ts            # App entry point
```

## Using Stores in Components

### Import Store
```typescript
import { useCurrencyStore } from '~/stores/currency'
```

### Option API (Vue 2)
```typescript
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useCurrencyStore } from '~/stores/currency'

export default Vue.extend({
  computed: {
    // Read-only state
    ...mapState(useCurrencyStore, ['fromCurrency', 'toCurrency']),

    // Writable state
    ...mapWritableState(useCurrencyStore, ['amount']),

    // Custom computed
    total(): number {
      return useCurrencyStore().convertedAmount
    }
  },

  methods: {
    // Map actions
    ...mapActions(useCurrencyStore, ['fetchRates', 'swapCurrencies'])
  },

  mounted() {
    // Call actions
    this.fetchRates()
  }
})
```

## Using Services

### Exchange Rate API
```typescript
import { ExchangeRateAPI } from '~/services/api/exchange-rate.api'

const api = new ExchangeRateAPI()

// Get all rates for a base currency
const data = await api.getRates('USD')
// { base: 'USD', date: '2025-10-13', rates: { CNY: 7.24, EUR: 0.92, ... }}

// Get specific rate
const rate = await api.getRate('USD', 'EUR')
// 0.92

// Convert amount
const result = await api.convert(100, 'USD', 'EUR')
// 92.00
```

### Cache Service
```typescript
import { cacheService } from '~/services/core/cache.service'

// Cache data (TTL in minutes)
cacheService.set('my-key', myData, 60)

// Retrieve cached data
const data = cacheService.get<MyType>('my-key')

// Check if cached
if (cacheService.has('my-key')) {
  // ...
}

// Clear expired entries
cacheService.clearExpired()
```

### Logger Service
```typescript
import { logger } from '~/services/core/logger.service'

// Log with context and data
logger.info('User logged in', 'AuthService', { userId: 123 })
logger.error('API failed', 'ExchangeRateAPI', error)
logger.warn('Cache miss', 'CacheService')
logger.debug('Processing request', 'HttpService', { url: '...' })
```

### Currency Formatter
```typescript
import { CurrencyFormatter } from '~/services/utils/currency-formatter'

CurrencyFormatter.format(1234.567, 2)
// "1234.57"

CurrencyFormatter.formatWithSeparator(1234567.89, 2)
// "1,234,567.89"

CurrencyFormatter.formatWithSymbol(1234.56, '$', 2)
// "$1,234.56"

CurrencyFormatter.abbreviate(1500000)
// "1.50M"
```

### Rate Calculator
```typescript
import { RateCalculator } from '~/services/utils/rate-calculator'

RateCalculator.convert(100, 7.24)
// 724

RateCalculator.inverseRate(7.24)
// 0.1381

RateCalculator.crossRate(7.24, 0.92)
// 0.1271 (USD->CNY to USD->EUR = CNY->EUR)

RateCalculator.isValidRate(7.24)
// true
```

## Common Patterns

### Fetching and Caching Data
```typescript
import { useCurrencyStore } from '~/stores/currency'

// In component
mounted() {
  const store = useCurrencyStore()

  // Auto-refresh if stale (> 1 hour)
  if (!store.lastUpdated || store.isRateStale) {
    store.fetchRates()
  }
}
```

### Saving to History
```typescript
import { useCurrencyStore } from '~/stores/currency'
import { useHistoryStore } from '~/stores/history'

async saveConversion() {
  const currency = useCurrencyStore()
  const history = useHistoryStore()

  await history.addRecord({
    from_currency: currency.fromCurrency,
    to_currency: currency.toCurrency,
    amount: currency.amount,
    result: currency.convertedAmount,
    rate: currency.currentRate!
  })
}
```

### Managing Favorites
```typescript
import { useFavoritesStore } from '~/stores/favorites'

const favorites = useFavoritesStore()

// Check if favorite
if (favorites.hasFavorite('USD', 'CNY')) {
  // ...
}

// Toggle favorite
await favorites.toggleFavorite('USD', 'CNY')
```

## TypeScript Tips

### Import Types
```typescript
import type {
  Currency,
  ConversionRecord,
  CurrencyPair
} from '~/types'
```

### Type Guards
```typescript
import { isCurrencyPair, isConversionRecord } from '~/types'

if (isCurrencyPair(data)) {
  // TypeScript knows data is CurrencyPair
  console.log(data.from_currency)
}
```

## Error Handling

### Try-Catch Pattern
```typescript
try {
  await api.getRates('USD')
} catch (error) {
  if (error.message.includes('timeout')) {
    // Handle timeout
  } else if (error.message.includes('network')) {
    // Handle network error
  } else {
    // Generic error
  }
}
```

### Store Error State
```typescript
const store = useCurrencyStore()

if (store.error) {
  // Display error to user
  console.error(store.error)
}

if (store.isLoading) {
  // Show loading indicator
}
```

## Development Commands

```bash
# Install dependencies
npm install

# Run on iOS
npm run ios

# Run with debugging
npm run debug:ios

# Type check
npx tsc --noEmit

# Clean build
npm run clean

# Production build
npm run build:ios
```

## Best Practices

### 1. Always Use Stores for State
❌ Don't:
```typescript
data() {
  return { currency: 'USD' }
}
```

✅ Do:
```typescript
computed: {
  ...mapState(useCurrencyStore, ['currency'])
}
```

### 2. Use Services for Business Logic
❌ Don't:
```typescript
methods: {
  async getRates() {
    const response = await Http.getJSON('https://...')
    this.rates = response.rates
  }
}
```

✅ Do:
```typescript
import { ExchangeRateAPI } from '~/services/api/exchange-rate.api'

methods: {
  async getRates() {
    const api = new ExchangeRateAPI()
    const data = await api.getRates('USD')
    this.rates = data.rates
  }
}
```

### 3. Type Everything
❌ Don't:
```typescript
function convert(amount, rate) {
  return amount * rate
}
```

✅ Do:
```typescript
function convert(amount: number, rate: number): number {
  return amount * rate
}
```

### 4. Log Important Operations
```typescript
import { logger } from '~/services/core/logger.service'

methods: {
  async fetchData() {
    logger.info('Fetching rates', 'ConvertView')
    try {
      const data = await api.getRates('USD')
      logger.info('Rates fetched successfully', 'ConvertView', {
        count: Object.keys(data.rates).length
      })
    } catch (error) {
      logger.error('Failed to fetch rates', 'ConvertView', error)
    }
  }
}
```

### 5. Handle Loading States
```typescript
computed: {
  ...mapState(useCurrencyStore, ['isLoading', 'error'])
},

// In template
<ActivityIndicator v-if="isLoading" />
<Label v-if="error" :text="error" class="error" />
```

## Troubleshooting

### "Pinia not found"
Make sure Pinia is registered in app.ts:
```typescript
import { pinia } from './stores'
new Vue({ pinia, ... })
```

### "Type errors"
Run type check:
```bash
npx tsc --noEmit
```

### "Store state not updating"
Ensure you're using `mapWritableState` for writable properties:
```typescript
...mapWritableState(useCurrencyStore, ['amount'])
```

### "Cache not working"
Check TTL settings:
```typescript
cacheService.set('key', data, 60) // 60 minutes
```

---

For more details, see [ARCHITECTURE_UPGRADE_SUMMARY.md](ARCHITECTURE_UPGRADE_SUMMARY.md)
