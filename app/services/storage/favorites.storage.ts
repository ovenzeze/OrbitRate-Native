import { NativeScriptService } from '~/services/core/nativescript.service'
import { logger } from '~/services/core/logger.service'
import { ConversionRecord } from '~/types'

export interface CurrencyPair {
  from_currency: string
  to_currency: string
}

export interface FavoriteItem {
  id: string
  type: 'pair' | 'conversion'
  data: CurrencyPair | ConversionRecord
  created_at: Date
}

const FAVORITES_KEY = 'favorites'

export class FavoritesStorage {
  async getAll(): Promise<FavoriteItem[]> {
    try {
      const data = NativeScriptService.getString(FAVORITES_KEY)
      if (!data) {
        return []
      }

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at)
      }))
    } catch (error) {
      logger.error('Failed to load favorites', 'FavoritesStorage', error)
      return []
    }
  }

  async save(item: FavoriteItem): Promise<void> {
    try {
      const items = await this.getAll()
      items.unshift(item)

      NativeScriptService.setString(FAVORITES_KEY, JSON.stringify(items))
      logger.info('Saved favorite item', 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to save favorite', 'FavoritesStorage', error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const items = await this.getAll()
      const filtered = items.filter(item => item.id !== id)
      NativeScriptService.setString(FAVORITES_KEY, JSON.stringify(filtered))
      logger.info(`Removed favorite ${id}`, 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to remove favorite', 'FavoritesStorage', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      NativeScriptService.remove(FAVORITES_KEY)
      logger.info('Cleared all favorites', 'FavoritesStorage')
    } catch (error) {
      logger.error('Failed to clear favorites', 'FavoritesStorage', error)
      throw error
    }
  }
}
