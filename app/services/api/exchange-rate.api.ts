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
