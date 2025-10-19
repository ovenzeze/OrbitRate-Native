export interface Currency {
  code: string
  name: string
  symbol: string
  country?: string
  flag?: string
}

// Static currency data - can be extended or fetched from API
const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan', flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China', flag: '🇨🇳' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong', flag: '🇭🇰' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore', flag: '🇸🇬' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', country: 'Sweden', flag: '🇸🇪' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea', flag: '🇰🇷' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', country: 'Norway', flag: '🇳🇴' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', country: 'Mexico', flag: '🇲🇽' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', country: 'Taiwan', flag: '🇹🇼' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa', flag: '🇿🇦' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil', flag: '🇧🇷' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', country: 'Denmark', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland', flag: '🇵🇱' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand', flag: '🇹🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary', flag: '🇭🇺' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', country: 'Israel', flag: '🇮🇱' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', country: 'Chile', flag: '🇨🇱' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines', flag: '🇵🇭' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'UAE', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey', flag: '🇹🇷' },
]

export class CurrencyInfoAPI {
  getCurrencies(): Currency[] {
    return CURRENCIES
  }

  getCurrency(code: string): Currency | undefined {
    return CURRENCIES.find(c => c.code === code)
  }

  searchCurrencies(query: string): Currency[] {
    const lowerQuery = query.toLowerCase()
    return CURRENCIES.filter(
      c =>
        c.code.toLowerCase().includes(lowerQuery) ||
        c.name.toLowerCase().includes(lowerQuery) ||
        c.country?.toLowerCase().includes(lowerQuery)
    )
  }

  getPopularCurrencies(): Currency[] {
    const popularCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF']
    return CURRENCIES.filter(c => popularCodes.includes(c.code))
  }
}
