export class CurrencyFormatter {
  /**
   * Format a number as currency with proper decimal places
   */
  static format(value: number, decimalPlaces: number = 2): string {
    return value.toFixed(decimalPlaces)
  }

  /**
   * Format with thousands separator
   */
  static formatWithSeparator(value: number, decimalPlaces: number = 2): string {
    const parts = value.toFixed(decimalPlaces).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  /**
   * Format with currency symbol
   */
  static formatWithSymbol(
    value: number,
    symbol: string,
    decimalPlaces: number = 2
  ): string {
    const formatted = this.formatWithSeparator(value, decimalPlaces)
    return `${symbol}${formatted}`
  }

  /**
   * Format for display (with proper rounding)
   */
  static formatForDisplay(value: number): string {
    if (value === 0) return '0.00'

    // For very small numbers, use scientific notation
    if (Math.abs(value) < 0.01) {
      return value.toExponential(2)
    }

    // For large numbers, use thousands separator
    if (Math.abs(value) >= 1000) {
      return this.formatWithSeparator(value, 2)
    }

    // For regular numbers, use 2-4 decimal places based on magnitude
    if (Math.abs(value) >= 1) {
      return value.toFixed(2)
    }

    return value.toFixed(4)
  }

  /**
   * Parse formatted currency string back to number
   */
  static parse(value: string): number {
    // Remove common currency symbols and separators
    const cleaned = value.replace(/[^0-9.-]/g, '')
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }

  /**
   * Abbreviate large numbers (e.g., 1000000 -> 1M)
   */
  static abbreviate(value: number): string {
    const abs = Math.abs(value)
    const sign = value < 0 ? '-' : ''

    if (abs >= 1e9) {
      return `${sign}${(abs / 1e9).toFixed(2)}B`
    }
    if (abs >= 1e6) {
      return `${sign}${(abs / 1e6).toFixed(2)}M`
    }
    if (abs >= 1e3) {
      return `${sign}${(abs / 1e3).toFixed(2)}K`
    }

    return value.toFixed(2)
  }
}
