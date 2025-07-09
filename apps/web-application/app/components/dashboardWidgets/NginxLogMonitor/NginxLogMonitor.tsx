'use client'
import { useState } from 'react'
import './NginxLogMonitor.scss'
import { getNginxLogs } from '@lib/actions/getNginxLogs'

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

interface NginxLogMonitorProps {
  maxEntries?: number
}

const NginxLogMonitor = ({ maxEntries = 100 }: NginxLogMonitorProps) => {
  const [logData, setLogData] = useState<NginxLogData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'access' | 'error' | 'stats'>('access')

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const websiteUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || 'localhost'
      const data = await getNginxLogs(websiteUrl, maxEntries)
      setLogData(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch nginx logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 500) return 'critical'
    if (status >= 400) return 'warning'
    if (status >= 300) return 'info'
    return 'normal'
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'normal'
      case 'POST': return 'info'
      case 'PUT': return 'warning'
      case 'DELETE': return 'critical'
      default: return 'normal'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return timestamp
    }
  }

  const renderAccessLogs = () => (
    <div className="access-logs">
      <div className="log-entries">
        {logData?.accessLogs.length === 0 ? (
          <div className="no-logs">No access logs found for this website</div>
        ) : (
          logData?.accessLogs.map((entry, index) => (
            <div key={index} className="log-entry">
              <div className="log-entry-header">
                <span className="timestamp">{formatTimestamp(entry.timestamp)}</span>
                <span className="ip">{entry.ip}</span>
                <span className={`method ${getMethodColor(entry.method)}`}>
                  {entry.method}
                </span>
                <span className={`status ${getStatusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>
              <div className="log-entry-details">
                <span className="path">{entry.path}</span>
                <span className="size">{entry.size}</span>
                {entry.responseTime && (
                  <span className="response-time">{entry.responseTime}ms</span>
                )}
              </div>
              {entry.userAgent && (
                <div className="user-agent">{entry.userAgent}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderErrorLogs = () => (
    <div className="error-logs">
      <div className="log-entries">
        {logData?.errorLogs.length === 0 ? (
          <div className="no-logs">No error logs found for this website</div>
        ) : (
          logData?.errorLogs.map((entry, index) => (
            <div key={index} className="log-entry error-entry">
              <div className="log-entry-header">
                <span className="timestamp">{formatTimestamp(entry.timestamp)}</span>
                <span className="ip">{entry.ip}</span>
              </div>
              <div className="error-details">
                {entry.raw}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderStats = () => (
    <div className="stats-view">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Requests</div>
          <div className="stat-value">{logData?.stats.total || 0}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Error Count</div>
          <div className="stat-value critical">{logData?.stats.errors || 0}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Status Codes</div>
          <div className="stat-breakdown">
            {Object.entries(logData?.stats.statusCodes || {}).map(([status, count]) => (
              <div key={status} className="stat-item">
                <span className={`status-code ${getStatusColor(parseInt(status))}`}>
                  {status}
                </span>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">HTTP Methods</div>
          <div className="stat-breakdown">
            {Object.entries(logData?.stats.methods || {}).map(([method, count]) => (
              <div key={method} className="stat-item">
                <span className={`method ${getMethodColor(method)}`}>{method}</span>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="nginx-log-monitor">
      <div className="monitor-header">
        <h3>Nginx Log Monitor</h3>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={fetchLogs}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Logs'}
          </button>
          {logData && (
            <div className="last-updated">
              Last updated: {new Date(logData.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-state">{error}</div>
      )}

      {logData && (
        <>
          <div className="log-tabs">
            <button
              className={`tab-button ${activeTab === 'access' ? 'active' : ''}`}
              onClick={() => setActiveTab('access')}
            >
              Access Logs ({logData.accessLogs.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'error' ? 'active' : ''}`}
              onClick={() => setActiveTab('error')}
            >
              Error Logs ({logData.errorLogs.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
          </div>

          <div className="log-content">
            {activeTab === 'access' && renderAccessLogs()}
            {activeTab === 'error' && renderErrorLogs()}
            {activeTab === 'stats' && renderStats()}
          </div>
        </>
      )}
    </div>
  )
}

export default NginxLogMonitor