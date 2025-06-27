'use client'
import { useEffect, useState } from 'react'
import './MonitorResources.scss'
import { getSystemResources } from '@lib/actions/getSystemResources';

interface SystemResources {
  cpu: {
    overall: number
    cores: number[]
  }
  ram: {
    used: number
    total: number
    percentage: number
  }
  disk: {
    used: number
    total: number
    free: number
    percentage: number
  }
  timestamp: number
}

interface MonitorResourcesProps {
  interval?: number
}

export default function MonitorResources({ interval = 10000 }: MonitorResourcesProps) {
  const [resources, setResources] = useState<SystemResources | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResources = async () => {
    try {
      const data = await getSystemResources()
      setResources(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch system resources')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
    const intervalId = setInterval(fetchResources, interval)
    return () => clearInterval(intervalId)
  }, [interval])

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'critical'
    if (percentage >= 70) return 'warning'
    return 'normal'
  }

  const formatBytes = (bytes: number) => {
    return `${bytes.toFixed(1)} GB`
  }

  if (loading) {
    return (
      <div className="monitor-resources">
        <div className="monitor-header">
          <h3>System Resources</h3>
        </div>
        <div className="loading-state">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="monitor-resources">
        <div className="monitor-header">
          <h3>System Resources</h3>
        </div>
        <div className="error-state">{error}</div>
      </div>
    )
  }

  return (
    <div className="monitor-resources">
      <div className="monitor-header">
        <h3>System Resources</h3>
        <div className="last-updated">
          Last updated: {resources ? new Date(resources.timestamp).toLocaleTimeString() : 'N/A'}
        </div>
      </div>

      <div className="resources-grid">
        <div className="resource-card cpu-card">
          <div className="resource-header">
            <span className="resource-title">CPU Usage (Overall)</span>
            <span className={`resource-value ${getUsageColor(resources?.cpu.overall || 0)}`}>
              {resources?.cpu.overall || 0}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getUsageColor(resources?.cpu.overall || 0)}`}
              style={{ width: `${resources?.cpu.overall || 0}%` }}
            />
          </div>

          <div className="cpu-cores">
            <div className="cores-title">Individual Cores:</div>
            <div className="cores-grid">
              {resources?.cpu.cores.map((coreUsage, index) => (
                <div key={index} className="core-item">
                  <div className="core-label">Core {index + 1}</div>
                  <div className="core-usage-container">
                    <span className={`core-value ${getUsageColor(coreUsage)}`}>
                      {coreUsage}%
                    </span>
                    <div className="core-progress-bar">
                      <div
                        className={`core-progress-fill ${getUsageColor(coreUsage)}`}
                        style={{ width: `${coreUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-header">
            <span className="resource-title">RAM Usage</span>
            <span className={`resource-value ${getUsageColor(resources?.ram.percentage || 0)}`}>
              {resources?.ram.percentage || 0}%
            </span>
          </div>
          <div className="resource-details">
            <span>{formatBytes(resources?.ram.used || 0)} / {formatBytes(resources?.ram.total || 0)}</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getUsageColor(resources?.ram.percentage || 0)}`}
              style={{ width: `${resources?.ram.percentage || 0}%` }}
            />
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-header">
            <span className="resource-title">Disk Usage</span>
            <span className={`resource-value ${getUsageColor(resources?.disk.percentage || 0)}`}>
              {resources?.disk.percentage || 0}%
            </span>
          </div>
          <div className="resource-details">
            <div className="disk-details">
              <span>Used: {formatBytes(resources?.disk.used || 0)}</span>
              <span>Free: {formatBytes(resources?.disk.free || 0)}</span>
              <span>Total: {formatBytes(resources?.disk.total || 0)}</span>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getUsageColor(resources?.disk.percentage || 0)}`}
              style={{ width: `${resources?.disk.percentage || 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// 'use client'
// import { useEffect, useState } from 'react'
// import './MonitorResources.scss'
// import { getSystemResources } from '@lib/actions/getSystemResources';
//
// interface SystemResources {
//   cpu: number
//   ram: {
//     used: number
//     total: number
//     percentage: number
//   }
//   gpu?: {
//     usage: number
//     memory: {
//       used: number
//       total: number
//     }
//   }
//   timestamp: number
// }
//
// interface MonitorResourcesProps {
//   interval?: number
// }
//
// export default function MonitorResources({ interval = 10000 }: MonitorResourcesProps) {
//   const [resources, setResources] = useState<SystemResources | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//
//   const fetchResources = async () => {
//     try {
//       const data = await getSystemResources()
//       setResources(data)
//       setError(null)
//     } catch (err) {
//       setError('Failed to fetch system resources')
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   useEffect(() => {
//     fetchResources()
//     const intervalId = setInterval(fetchResources, interval)
//     return () => clearInterval(intervalId)
//   }, [interval])
//
//   const getUsageColor = (percentage: number) => {
//     if (percentage >= 90) return 'critical'
//     if (percentage >= 70) return 'warning'
//     return 'normal'
//   }
//
//   const formatBytes = (bytes: number) => {
//     return `${bytes.toFixed(1)} GB`
//   }
//
//   if (loading) {
//     return (
//       <div className="monitor-resources">
//         <div className="monitor-header">
//           <h3>System Resources</h3>
//         </div>
//         <div className="loading-state">Loading...</div>
//       </div>
//     )
//   }
//
//   if (error) {
//     return (
//       <div className="monitor-resources">
//         <div className="monitor-header">
//           <h3>System Resources</h3>
//         </div>
//         <div className="error-state">{error}</div>
//       </div>
//     )
//   }
//
//   return (
//     <div className="monitor-resources">
//       <div className="monitor-header">
//         <h3>System Resources</h3>
//         <div className="last-updated">
//           Last updated: {resources ? new Date(resources.timestamp).toLocaleTimeString() : 'N/A'}
//         </div>
//       </div>
//
//       <div className="resources-grid">
//         <div className="resource-card">
//           <div className="resource-header">
//             <span className="resource-title">CPU Usage</span>
//             <span className={`resource-value ${getUsageColor(resources?.cpu || 0)}`}>
//               {resources?.cpu || 0}%
//             </span>
//           </div>
//           <div className="progress-bar">
//             <div
//               className={`progress-fill ${getUsageColor(resources?.cpu || 0)}`}
//               style={{ width: `${resources?.cpu || 0}%` }}
//             />
//           </div>
//         </div>
//
//         <div className="resource-card">
//           <div className="resource-header">
//             <span className="resource-title">RAM Usage</span>
//             <span className={`resource-value ${getUsageColor(resources?.ram.percentage || 0)}`}>
//               {resources?.ram.percentage || 0}%
//             </span>
//           </div>
//           <div className="resource-details">
//             <span>{formatBytes(resources?.ram.used || 0)} / {formatBytes(resources?.ram.total || 0)}</span>
//           </div>
//           <div className="progress-bar">
//             <div
//               className={`progress-fill ${getUsageColor(resources?.ram.percentage || 0)}`}
//               style={{ width: `${resources?.ram.percentage || 0}%` }}
//             />
//           </div>
//         </div>
//
//         {resources?.gpu && (
//           <div className="resource-card">
//             <div className="resource-header">
//               <span className="resource-title">GPU Usage</span>
//               <span className={`resource-value ${getUsageColor(resources.gpu.usage)}`}>
//                 {resources.gpu.usage}%
//               </span>
//             </div>
//             <div className="resource-details">
//               <span>{resources.gpu.memory.used} MB / {resources.gpu.memory.total} MB</span>
//             </div>
//             <div className="progress-bar">
//               <div
//                 className={`progress-fill ${getUsageColor(resources.gpu.usage)}`}
//                 style={{ width: `${resources.gpu.usage}%` }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }