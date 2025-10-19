type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  context?: string
  timestamp: Date
  data?: any
}

export class LoggerService {
  private isDevelopment = __DEV__
  private logs: LogEntry[] = []
  private maxLogs = 1000

  private formatTimestamp(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  }

  private log(level: LogLevel, message: string, context?: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date(),
      data
    }

    this.logs.push(entry)

    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    if (this.isDevelopment) {
      const timestamp = this.formatTimestamp(entry.timestamp)
      const contextStr = context ? ` [${context}]` : ''
      const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : ''

      const formattedMessage = `[${timestamp}]${contextStr} ${message}${dataStr}`

      switch (level) {
        case 'debug':
          console.log(formattedMessage)
          break
        case 'info':
          console.info(formattedMessage)
          break
        case 'warn':
          console.warn(formattedMessage)
          break
        case 'error':
          console.error(formattedMessage)
          break
      }
    }
  }

  debug(message: string, context?: string, data?: any): void {
    this.log('debug', message, context, data)
  }

  info(message: string, context?: string, data?: any): void {
    this.log('info', message, context, data)
  }

  warn(message: string, context?: string, data?: any): void {
    this.log('warn', message, context, data)
  }

  error(message: string, context?: string, data?: any): void {
    this.log('error', message, context, data)
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level)
    }
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }
}

// Singleton instance
export const logger = new LoggerService()
