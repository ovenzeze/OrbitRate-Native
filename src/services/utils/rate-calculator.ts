export class RateCalculator {
  /**
   * Convert amount from one currency to another
   */
  static convert(amount: number, rate: number): number {
    return amount * rate
  }

  /**
   * Calculate inverse rate (e.g., USD->EUR to EUR->USD)
   */
  static inverseRate(rate: number): number {
    if (rate === 0) throw new Error('Rate cannot be zero')
    return 1 / rate
  }

  /**
   * Calculate cross rate between two currencies
   * @param rateFromBase Rate from base currency to currency A
   * @param rateToTarget Rate from base currency to currency B
   */
  static crossRate(rateFromBase: number, rateToTarget: number): number {
    if (rateFromBase === 0) throw new Error('Base rate cannot be zero')
    return rateToTarget / rateFromBase
  }

  /**
   * Calculate percentage change between two rates
   */
  static percentageChange(oldRate: number, newRate: number): number {
    if (oldRate === 0) throw new Error('Old rate cannot be zero')
    return ((newRate - oldRate) / oldRate) * 100
  }

  /**
   * Round rate to specified decimal places
   */
  static roundRate(rate: number, decimals: number = 4): number {
    const multiplier = Math.pow(10, decimals)
    return Math.round(rate * multiplier) / multiplier
  }

  /**
   * Calculate spread (difference) between buy and sell rates
   */
  static calculateSpread(buyRate: number, sellRate: number): number {
    return Math.abs(buyRate - sellRate)
  }

  /**
   * Calculate mid-market rate (average of buy and sell)
   */
  static midMarketRate(buyRate: number, sellRate: number): number {
    return (buyRate + sellRate) / 2
  }

  /**
   * Validate rate is within reasonable bounds
   */
  static isValidRate(rate: number): boolean {
    return (
      rate > 0 &&
      rate !== Infinity &&
      rate !== -Infinity &&
      !isNaN(rate) &&
      rate < 1e10 // Reasonable upper bound
    )
  }

  /**
   * Format rate for display with appropriate precision
   */
  static formatRate(rate: number): string {
    if (rate >= 1) {
      return rate.toFixed(4)
    } else if (rate >= 0.01) {
      return rate.toFixed(6)
    } else {
      return rate.toFixed(8)
    }
  }
}
