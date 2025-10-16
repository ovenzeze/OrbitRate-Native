import { defineStore } from 'pinia'
import { FavoritesStorage } from '~/services/storage/favorites.storage'
import { FavoriteItem, CurrencyPair } from '~/types'
import { FavoritesState } from '~/types'

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    items: [],
    isLoading: false
  }),

  getters: {
    hasFavorite(state) {
      return (from: string, to: string): boolean => {
      return state.items.some((item: FavoriteItem) => 
          item.type === 'pair' &&
          (item.data as CurrencyPair).from_currency === from &&
          (item.data as CurrencyPair).to_currency === to
        )
      }
    },

    totalFavorites(state): number {
      return state.items.length
    }
  },

  actions: {
    async loadFavorites() {
      this.isLoading = true
      try {
        const storage = new FavoritesStorage()
        this.items = await storage.getAll()
      } catch (error) {
        console.error('[FavoritesStore] Failed to load favorites:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addFavorite(from: string, to: string) {
      if (this.hasFavorite(from, to)) {
        return
      }

      const newItem: FavoriteItem = {
        id: this.generateId(),
        type: 'pair',
        data: {
          from_currency: from,
          to_currency: to
        },
        created_at: new Date()
      }

      this.items.unshift(newItem)

      const storage = new FavoritesStorage()
      await storage.save(newItem)
    },

    async removeFavorite(id: string) {
      const index = this.items.findIndex((item: FavoriteItem) => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)

        const storage = new FavoritesStorage()
        await storage.remove(id)
      }
    },

    async toggleFavorite(from: string, to: string) {
      const existing = this.items.find((item: FavoriteItem) =>
        item.type === 'pair' &&
        (item.data as CurrencyPair).from_currency === from &&
        (item.data as CurrencyPair).to_currency === to
      )

      if (existing) {
        await this.removeFavorite(existing.id)
      } else {
        await this.addFavorite(from, to)
      }
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }
})
