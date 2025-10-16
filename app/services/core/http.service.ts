import { Http, HttpResponse } from '@nativescript/core'

export interface HttpConfig {
  baseUrl?: string
  timeout?: number
  headers?: Record<string, string>
}

export class HttpService {
  private config: HttpConfig

  constructor(config: HttpConfig = {}) {
    this.config = {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    }
  }

  async get<T>(url: string, options: any = {}): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url)
      const response = await Http.request({
        url: fullUrl,
        method: 'GET',
        timeout: this.config.timeout,
        headers: { ...this.config.headers, ...options.headers }
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data: any, options: any = {}): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url)
      const response = await Http.request({
        url: fullUrl,
        method: 'POST',
        content: JSON.stringify(data),
        timeout: this.config.timeout,
        headers: { ...this.config.headers, ...options.headers }
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path
    }
    return `${this.config.baseUrl || ''}${path}`
  }

  private handleResponse<T>(response: HttpResponse): T {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response.content?.toJSON() as T
    }

    throw new Error(`HTTP Error: ${response.statusCode}`)
  }

  private handleError(error: any): Error {
    if (error.message?.includes('timeout')) {
      return new Error('Request timeout. Please check your network connection.')
    }

    if (error.message?.includes('network')) {
      return new Error('Network error. Please check your internet connection.')
    }

    return new Error(error.message || 'An unexpected error occurred')
  }
}
