import { NativeScriptService } from '~/services/core/nativescript.service'
import { logger } from '~/services/core/logger.service'

export interface ConversionRecord {
  id: string
  from_currency: string
  to_currency: string
  amount: number
  result: number
  rate: number
  created_at: Date
}

const HISTORY_KEY = 'conversion_history'
const MAX_RECORDS = 100

export class HistoryStorage {
  async getAll(): Promise<ConversionRecord[]> {
    try {
      const data = NativeScriptService.getString(HISTORY_KEY)
      if (!data) {
        return []
      }

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at)
      }))
    } catch (error) {
      logger.error('Failed to load history', 'HistoryStorage', error)
      return []
    }
  }

  async save(record: ConversionRecord): Promise<void> {
    try {
      const records = await this.getAll()
      records.unshift(record)

      // Keep only latest MAX_RECORDS
      if (records.length > MAX_RECORDS) {
        records.splice(MAX_RECORDS)
      }

      NativeScriptService.setString(HISTORY_KEY, JSON.stringify(records))
      logger.info('Saved conversion record', 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to save history record', 'HistoryStorage', error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const records = await this.getAll()
      const filtered = records.filter(r => r.id !== id)
      NativeScriptService.setString(HISTORY_KEY, JSON.stringify(filtered))
      logger.info(`Removed record ${id}`, 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to remove history record', 'HistoryStorage', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      NativeScriptService.remove(HISTORY_KEY)
      logger.info('Cleared all history', 'HistoryStorage')
    } catch (error) {
      logger.error('Failed to clear history', 'HistoryStorage', error)
      throw error
    }
  }
}
