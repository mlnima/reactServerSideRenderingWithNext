'use server'

import { promises as fs } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface LogEntry {
  timestamp: string
  method: string
  path: string
  status: number
  size: string
  userAgent: string
  ip: string
  referer: string
  responseTime?: string
  raw: string
}

interface NginxLogData {
  accessLogs: LogEntry[]
  errorLogs: LogEntry[]
  stats: {
    total: number
    statusCodes: { [key: string]: number }
    methods: { [key: string]: number }
    errors: number
  }
  timestamp: number
}

// Parse nginx access log line (common log format)
const parseAccessLogLine = (line: string): LogEntry | null => {
  // Enhanced regex to match more nginx log formats
  const logRegex = /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) ([^"]*)" (\d+) (\S+) "([^"]*)" "([^"]*)"(?: "([^"]*)")?(?: (\d+\.\d+))?/

  const match = line.match(logRegex)
  if (!match) {
    // Try simpler format
    const simpleRegex = /^(\S+).*\[([^\]]+)\] "(\S+) ([^"]*)" (\d+) (\S+)/
    const simpleMatch = line.match(simpleRegex)
    if (simpleMatch) {
      return {
        ip: simpleMatch[1],
        timestamp: simpleMatch[2],
        method: simpleMatch[3],
        path: simpleMatch[4],
        status: parseInt(simpleMatch[5]),
        size: simpleMatch[6],
        userAgent: '',
        referer: '',
        raw: line
      }
    }
    return null
  }

  return {
    ip: match[1],
    timestamp: match[2],
    method: match[3],
    path: match[4],
    status: parseInt(match[5]),
    size: match[6],
    referer: match[7] || '',
    userAgent: match[8] || '',
    responseTime: match[10] || undefined,
    raw: line
  }
}

// Parse nginx error log line
const parseErrorLogLine = (line: string): LogEntry | null => {
  // Error log format: timestamp [level] pid#tid: message
  const errorRegex = /^(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] \d+#\d+: (.+)/

  const match = line.match(errorRegex)
  if (!match) {
    // If regex doesn't match, return raw line
    return {
      timestamp: new Date().toISOString(),
      method: 'ERROR',
      path: '',
      status: 500,
      size: '0',
      userAgent: '',
      ip: '',
      referer: '',
      raw: line
    }
  }

  return {
    timestamp: match[1],
    method: 'ERROR',
    path: '',
    status: 500,
    size: '0',
    userAgent: '',
    ip: '',
    referer: '',
    raw: line
  }
}

// Filter logs by website URL
const filterLogsByWebsite = (logs: LogEntry[], websiteUrl: string): LogEntry[] => {
  // Extract domain from URL
  const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return logs.filter(log => {
    // Check if the log entry is related to the website
    // This can be done by checking the Host header, server name, or referrer
    const logDomain = log.referer.replace(/^https?:\/\//, '').split('/')[0]
    return logDomain === domain || log.path.includes(domain) || log.raw.includes(domain)
  })
}

// Read and parse access logs
const readAccessLogs = async (websiteUrl: string, maxEntries: number): Promise<LogEntry[]> => {
  const logPaths = [
    '/var/log/nginx/access.log',
    '/var/log/nginx/access.log.1',
    '/usr/local/var/log/nginx/access.log', // macOS with Homebrew
    '/opt/homebrew/var/log/nginx/access.log' // macOS with Homebrew on M1
  ]

  let allLogs: LogEntry[] = []

  for (const logPath of logPaths) {
    try {
      const data = await fs.readFile(logPath, 'utf8')
      const lines = data.trim().split('\n').filter(line => line.length > 0)

      const parsedLogs = lines
        .map(parseAccessLogLine)
        .filter((log): log is LogEntry => log !== null)

      allLogs = allLogs.concat(parsedLogs)
    } catch (error) {
      // Log file might not exist or be accessible, continue to next one
      continue
    }
  }

  // Filter by website URL if provided
  if (websiteUrl && websiteUrl !== 'localhost') {
    allLogs = filterLogsByWebsite(allLogs, websiteUrl)
  }

  // Sort by timestamp (most recent first) and limit
  return allLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxEntries)
}

// Read and parse error logs
const readErrorLogs = async (websiteUrl: string, maxEntries: number): Promise<LogEntry[]> => {
  const logPaths = [
    '/var/log/nginx/error.log',
    '/var/log/nginx/error.log.1',
    '/usr/local/var/log/nginx/error.log', // macOS with Homebrew
    '/opt/homebrew/var/log/nginx/error.log' // macOS with Homebrew on M1
  ]

  let allLogs: LogEntry[] = []

  for (const logPath of logPaths) {
    try {
      const data = await fs.readFile(logPath, 'utf8')
      const lines = data.trim().split('\n').filter(line => line.length > 0)

      const parsedLogs = lines
        .map(parseErrorLogLine)
        .filter((log): log is LogEntry => log !== null)

      allLogs = allLogs.concat(parsedLogs)
    } catch (error) {
      // Log file might not exist or be accessible, continue to next one
      continue
    }
  }

  // Filter by website URL if provided
  if (websiteUrl && websiteUrl !== 'localhost') {
    allLogs = filterLogsByWebsite(allLogs, websiteUrl)
  }

  // Sort by timestamp (most recent first) and limit
  return allLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxEntries)
}

// Generate statistics from logs
const generateStats = (accessLogs: LogEntry[], errorLogs: LogEntry[]): NginxLogData['stats'] => {
  const statusCodes: { [key: string]: number } = {}
  const methods: { [key: string]: number } = {}

  accessLogs.forEach(log => {
    // Count status codes
    const statusCode = log.status.toString()
    statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1

    // Count methods
    methods[log.method] = (methods[log.method] || 0) + 1
  })

  return {
    total: accessLogs.length,
    statusCodes,
    methods,
    errors: errorLogs.length
  }
}

export async function getNginxLogs(websiteUrl: string, maxEntries: number = 100): Promise<NginxLogData> {
  try {
    const [accessLogs, errorLogs] = await Promise.all([
      readAccessLogs(websiteUrl, maxEntries),
      readErrorLogs(websiteUrl, maxEntries)
    ])

    const stats = generateStats(accessLogs, errorLogs)

    return {
      accessLogs,
      errorLogs,
      stats,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error reading nginx logs:', error)

    // Return empty data structure on error
    return {
      accessLogs: [],
      errorLogs: [],
      stats: {
        total: 0,
        statusCodes: {},
        methods: {},
        errors: 0
      },
      timestamp: Date.now()
    }
  }
}

// Additional utility function to check if nginx is running
export async function checkNginxStatus(): Promise<{ running: boolean; message: string }> {
  try {
    const { stdout } = await execAsync('systemctl is-active nginx')
    return {
      running: stdout.trim() === 'active',
      message: stdout.trim()
    }
  } catch (error) {
    try {
      // Try alternative command for different systems
      const { stdout } = await execAsync('ps aux | grep nginx | grep -v grep')
      return {
        running: stdout.length > 0,
        message: stdout.length > 0 ? 'running' : 'not running'
      }
    } catch (altError) {
      return {
        running: false,
        message: 'Unable to determine nginx status'
      }
    }
  }
}