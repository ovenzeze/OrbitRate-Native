import { defineStore } from 'pinia'
import { SettingsStorage, AppSettings } from '~/services/storage/settings.storage'
import { SettingsState } from '~/types'

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    language: 'en',
    theme: 'auto',
    defaultCurrency: 'USD',
    autoRefresh: true,
    refreshInterval: 60,
    decimalPlaces: 2
  }),

  getters: {
    isDarkMode(state): boolean {
      if (state.theme === 'auto') {
        // TODO: Detect system theme
        return false
      }
      return state.theme === 'dark'
    }
  },

  actions: {
    loadSettings() {
      const storage = new SettingsStorage()
      const settings = storage.load()
      Object.assign(this.$state, settings)
    },

    saveSettings() {
      const storage = new SettingsStorage()
      storage.save(this.$state as AppSettings)
    },

    setLanguage(language: 'en' | 'zh') {
      this.language = language
      this.saveSettings()
    },

    setTheme(theme: 'light' | 'dark' | 'auto') {
      this.theme = theme
      this.saveSettings()
    },

    setDefaultCurrency(currency: string) {
      this.defaultCurrency = currency
      this.saveSettings()
    },

    setAutoRefresh(enabled: boolean) {
      this.autoRefresh = enabled
      this.saveSettings()
    },

    setRefreshInterval(minutes: number) {
      this.refreshInterval = Math.max(1, minutes)
      this.saveSettings()
    },

    setDecimalPlaces(places: number) {
      this.decimalPlaces = Math.min(8, Math.max(0, places))
      this.saveSettings()
    },

    resetToDefaults() {
      const storage = new SettingsStorage()
      const defaults = storage.reset()
      Object.assign(this.$state, defaults)
    }
  }
})
