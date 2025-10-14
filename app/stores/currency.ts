import { defineStore } from 'pinia'
import { ExchangeRateAPI } from '~/services/api/exchange-rate.api'
import { CurrencyState } from '~/types'

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
    convertedAmount(state): number {
      if (!state.currentRate) return 0
      return state.amount * state.currentRate
    },

    isRateStale(state): boolean {
      if (!state.lastUpdated) return true
      const hoursSinceUpdate = (Date.now() - state.lastUpdated.getTime()) / 1000 / 60 / 60
      return hoursSinceUpdate > 1
    },

    formattedAmount(): (value: number) => string {
      return (value: number): string => {
        return value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
    },

    rateText(state): string {
      if (!state.currentRate) return ''
      return `1 ${state.fromCurrency} = ${state.currentRate.toFixed(4)} ${state.toCurrency}`
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
      } catch (error: any) {
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
