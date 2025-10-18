import { logger } from './logger.service'

export class PerformanceService {
  private static instance: PerformanceService
  private metrics = new Map<string, number>()

  static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService()
    }
    return PerformanceService.instance
  }

  startTimer(label: string): void {
    this.metrics.set(label, Date.now())
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label)
    if (!startTime) {
      logger.warn(`Timer '${label}' was not started`, 'PerformanceService')
      return 0
    }

    const duration = Date.now() - startTime
    this.metrics.delete(label)
    
    logger.info(`Timer '${label}' completed in ${duration}ms`, 'PerformanceService')
    return duration
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(label)
    return fn().finally(() => {
      this.endTimer(label)
    })
  }

  measureSync<T>(label: string, fn: () => T): T {
    this.startTimer(label)
    try {
      return fn()
    } finally {
      this.endTimer(label)
    }
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  clearMetrics(): void {
    this.metrics.clear()
  }
}

export const performanceService = PerformanceService.getInstance()
