import { Http, HttpResponse, HttpRequestOptions } from '@nativescript/core'

export interface HttpConfig {
  baseUrl?: string
  timeout?: number
  headers?: Record<string, string>
  retryAttempts?: number
  retryDelay?: number
}

export class HttpService {
  private config: Required<HttpConfig>

  constructor(config: HttpConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || '',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...config
    }
  }

  async get<T>(url: string, options: Partial<HttpRequestOptions> = {}): Promise<T> {
    return this.request<T>('GET', url, undefined, options)
  }

  async post<T>(url: string, data: any, options: Partial<HttpRequestOptions> = {}): Promise<T> {
    return this.request<T>('POST', url, data, options)
  }

  private async request<T>(
    method: string, 
    url: string, 
    data?: any, 
    options: Partial<HttpRequestOptions> = {}
  ): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const fullUrl = this.buildUrl(url)
        const requestOptions: HttpRequestOptions = {
          url: fullUrl,
          method,
          timeout: this.config.timeout,
          headers: { ...this.config.headers, ...options.headers },
          ...options
        }

        if (data && (method === 'POST' || method === 'PUT')) {
          requestOptions.content = JSON.stringify(data)
        }

        const response = await Http.request(requestOptions)
        return this.handleResponse<T>(response)
      } catch (error) {
        lastError = error as Error
        
        // 如果是最后一次尝试，直接抛出错误
        if (attempt === this.config.retryAttempts) {
          break
        }

        // 等待重试延迟
        await this.delay(this.config.retryDelay * Math.pow(2, attempt))
      }
    }

    throw this.handleError(lastError!)
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path
    }
    return `${this.config.baseUrl || ''}${path}`
  }

  private handleResponse<T>(response: HttpResponse): T {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      try {
        return response.content?.toJSON() as T
      } catch (error) {
        throw new Error('Invalid JSON response')
      }
    }

    throw new Error(`HTTP Error: ${response.statusCode} - Unknown error`)
  }

  private handleError(error: Error): Error {
    if (error.message?.includes('timeout')) {
      return new Error('Request timeout. Please check your network connection.')
    }

    if (error.message?.includes('network') || error.message?.includes('connection')) {
      return new Error('Network error. Please check your internet connection.')
    }

    if (error.message?.includes('404')) {
      return new Error('Resource not found.')
    }

    if (error.message?.includes('500')) {
      return new Error('Server error. Please try again later.')
    }

    return new Error(error.message || 'An unexpected error occurred')
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
