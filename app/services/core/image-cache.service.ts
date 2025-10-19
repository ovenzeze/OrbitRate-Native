import { ImageSource, fromFile, fromUrl } from '@nativescript/core'
import { cacheService } from './cache.service'

export class ImageCacheService {
  private static instance: ImageCacheService
  private cache = new Map<string, ImageSource>()

  static getInstance(): ImageCacheService {
    if (!ImageCacheService.instance) {
      ImageCacheService.instance = new ImageCacheService()
    }
    return ImageCacheService.instance
  }

  async loadImage(url: string, cacheKey?: string): Promise<ImageSource> {
    const key = cacheKey || url

    // 检查内存缓存
    if (this.cache.has(key)) {
      return this.cache.get(key)!
    }

    // 检查磁盘缓存
    const cachedImage = cacheService.get<ImageSource>(`image_${key}`)
    if (cachedImage) {
      this.cache.set(key, cachedImage)
      return cachedImage
    }

    try {
      // 从网络加载
      const imageSource = await fromUrl(url)
      
      // 缓存到内存和磁盘
      this.cache.set(key, imageSource)
      cacheService.set(`image_${key}`, imageSource, 24 * 60) // 24小时缓存

      return imageSource
    } catch (error) {
      throw new Error(`Failed to load image: ${url}`)
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  preloadImages(urls: string[]): Promise<ImageSource[]> {
    return Promise.all(urls.map(url => this.loadImage(url)))
  }
}

export const imageCacheService = ImageCacheService.getInstance()

