import { defineStore } from 'pinia'
import { HistoryStorage, ConversionRecord } from '~/services/storage/history.storage'
import { HistoryState } from '~/types'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => ({
    records: [],
    isLoading: false
  }),

  getters: {
    recentRecords(state) {
      return (limit: number = 10): ConversionRecord[] => {
        return state.records.slice(0, limit)
      }
    },

    recordsByDate(state) {
      const grouped: Record<string, ConversionRecord[]> = {}

      state.records.forEach(record => {
        const date = new Date(record.created_at).toLocaleDateString()
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(record)
      })

      return grouped
    },

    totalConversions(state): number {
      return state.records.length
    }
  },

  actions: {
    async loadHistory() {
      this.isLoading = true
      try {
        const storage = new HistoryStorage()
        this.records = await storage.getAll()
      } catch (error) {
        console.error('[HistoryStore] Failed to load history:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addRecord(record: Omit<ConversionRecord, 'id' | 'created_at'>) {
      const newRecord: ConversionRecord = {
        ...record,
        id: this.generateId(),
        created_at: new Date()
      }

      this.records.unshift(newRecord)

      const storage = new HistoryStorage()
      await storage.save(newRecord)
    },

    async removeRecord(id: string) {
      const index = this.records.findIndex(r => r.id === id)
      if (index !== -1) {
        this.records.splice(index, 1)

        const storage = new HistoryStorage()
        await storage.remove(id)
      }
    },

    async clearAll() {
      this.records = []

      const storage = new HistoryStorage()
      await storage.clear()
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }
})
