import { ImageSource } from '@nativescript/core'
import { cacheService } from './cache.service'
import { logger } from './logger.service'

export class ImageCacheService {
  private static instance: ImageCacheService
  private memoryCache = new Map<string, ImageSource>()
  private loadingPromises = new Map<string, Promise<ImageSource>>()

  static getInstance(): ImageCacheService {
    if (!ImageCacheService.instance) {
      ImageCacheService.instance = new ImageCacheService()
    }
    return ImageCacheService.instance
  }

  async loadImage(url: string, cacheKey?: string): Promise<ImageSource> {
    const key = cacheKey || url

    // 检查内存缓存
    if (this.memoryCache.has(key)) {
      logger.debug(`Image loaded from memory cache: ${key}`, 'ImageCacheService')
      return this.memoryCache.get(key)!
    }

    // 检查是否已有进行中的加载请求（防止重复加载）
    if (this.loadingPromises.has(key)) {
      logger.debug(`Waiting for existing image load: ${key}`, 'ImageCacheService')
      return this.loadingPromises.get(key)!
    }

    // 检查磁盘缓存
    const cachedData = cacheService.get<string>(`image_${key}`)
    if (cachedData) {
      try {
        logger.debug(`Image loaded from disk cache: ${key}`, 'ImageCacheService')
        const imageSource = await ImageSource.fromUrl(url) // 使用 URL 重新加载
        this.memoryCache.set(key, imageSource)
        return imageSource
      } catch (error) {
        logger.warn(`Failed to load cached image: ${key}`, 'ImageCacheService', error)
        cacheService.delete(`image_${key}`)
      }
    }

    // 创建加载 Promise
    const loadPromise = this.fetchImage(url, key)
    this.loadingPromises.set(key, loadPromise)

    try {
      const imageSource = await loadPromise
      return imageSource
    } finally {
      this.loadingPromises.delete(key)
    }
  }

  private async fetchImage(url: string, key: string): Promise<ImageSource> {
    try {
      logger.info(`Loading image from network: ${url}`, 'ImageCacheService')
      const imageSource = await ImageSource.fromUrl(url)
      
      // 缓存到内存和磁盘
      this.memoryCache.set(key, imageSource)
      cacheService.set(`image_${key}`, url, 24 * 60) // 24小时缓存

      logger.info(`Image successfully loaded and cached: ${key}`, 'ImageCacheService')
      return imageSource
    } catch (error) {
      logger.error(`Failed to load image: ${url}`, 'ImageCacheService', error)
      throw new Error(`Failed to load image: ${url}`)
    }
  }

  clearMemoryCache(): void {
    logger.info(`Clearing image memory cache (${this.memoryCache.size} items)`, 'ImageCacheService')
    this.memoryCache.clear()
  }

  clearCache(): void {
    this.clearMemoryCache()
    // 清理磁盘缓存中的图片
    logger.info('Clearing all image caches', 'ImageCacheService')
  }

  preloadImages(urls: string[]): Promise<ImageSource[]> {
    logger.info(`Preloading ${urls.length} images`, 'ImageCacheService')
    return Promise.all(urls.map(url => this.loadImage(url)))
  }

  getStats() {
    return {
      memoryCacheSize: this.memoryCache.size,
      loadingCount: this.loadingPromises.size
    }
  }
}

export const imageCacheService = ImageCacheService.getInstance()


