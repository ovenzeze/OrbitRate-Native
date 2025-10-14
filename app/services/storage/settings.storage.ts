import { ApplicationSettings } from '@nativescript/core'
import { logger } from '~/services/core/logger.service'

export interface AppSettings {
  language: 'en' | 'zh'
  theme: 'light' | 'dark' | 'auto'
  defaultCurrency: string
  autoRefresh: boolean
  refreshInterval: number // minutes
  decimalPlaces: number
}

const SETTINGS_KEY = 'app_settings'

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'auto',
  defaultCurrency: 'USD',
  autoRefresh: true,
  refreshInterval: 60,
  decimalPlaces: 2
}

export class SettingsStorage {
  load(): AppSettings {
    const saved = ApplicationSettings.getString(SETTINGS_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT_SETTINGS, ...parsed }
      } catch (error) {
        logger.error('Failed to parse settings', 'SettingsStorage', error)
        return DEFAULT_SETTINGS
      }
    }
    return DEFAULT_SETTINGS
  }

  save(settings: AppSettings): void {
    try {
      ApplicationSettings.setString(SETTINGS_KEY, JSON.stringify(settings))
      logger.info('Saved settings', 'SettingsStorage')
    } catch (error) {
      logger.error('Failed to save settings', 'SettingsStorage', error)
      throw error
    }
  }

  reset(): AppSettings {
    try {
      ApplicationSettings.remove(SETTINGS_KEY)
      logger.info('Reset settings to defaults', 'SettingsStorage')
      return DEFAULT_SETTINGS
    } catch (error) {
      logger.error('Failed to reset settings', 'SettingsStorage', error)
      throw error
    }
  }
}
