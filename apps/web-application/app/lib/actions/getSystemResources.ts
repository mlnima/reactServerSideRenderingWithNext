'use server'

import { exec } from 'child_process'
import { promisify } from 'util'
import os from 'os'
import { promises as fs } from 'fs'

const execAsync = promisify(exec)

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

async function getCPUUsage(): Promise<{ overall: number; cores: number[] }> {
  const cpus = os.cpus()
  const startMeasure = cpus.map(cpu => {
    const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0)
    const idle = cpu.times.idle
    return { total, idle }
  })

  await new Promise(resolve => setTimeout(resolve, 100))

  const endMeasure = os.cpus().map(cpu => {
    const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0)
    const idle = cpu.times.idle
    return { total, idle }
  })

  // Calculate per-core usage
  const coreUsage = endMeasure.map((end, i) => {
    const totalDiff = end.total - startMeasure[i].total
    const idleDiff = end.idle - startMeasure[i].idle
    return Math.round(((totalDiff - idleDiff) / totalDiff) * 100)
  })

  // Calculate overall usage
  const totalDiff = endMeasure.reduce((acc, end, i) => acc + (end.total - startMeasure[i].total), 0)
  const idleDiff = endMeasure.reduce((acc, end, i) => acc + (end.idle - startMeasure[i].idle), 0)
  const overall = Math.round(((totalDiff - idleDiff) / totalDiff) * 100)

  return {
    overall,
    cores: coreUsage
  }
}

async function getRAMUsage() {
  const total = os.totalmem()
  const free = os.freemem()
  const used = total - free
  const percentage = Math.round((used / total) * 100)

  return {
    used: Math.round(used / 1024 / 1024 / 1024 * 100) / 100,
    total: Math.round(total / 1024 / 1024 / 1024 * 100) / 100,
    percentage
  }
}

async function getDiskUsage(): Promise<SystemResources['disk']> {
  try {
    // Try to get disk usage using statvfs (Unix-like systems)
    if (process.platform !== 'win32') {
      try {
        const { stdout } = await execAsync('df -h /')
        const lines = stdout.trim().split('\n')
        if (lines.length > 1) {
          const diskLine = lines[1].split(/\s+/)
          if (diskLine.length >= 6) {
            const total = parseFloat(diskLine[1].replace('G', '').replace('T', '000'))
            const used = parseFloat(diskLine[2].replace('G', '').replace('T', '000'))
            const free = parseFloat(diskLine[3].replace('G', '').replace('T', '000'))
            const percentage = parseInt(diskLine[4].replace('%', ''))

            return {
              used: Math.round(used * 100) / 100,
              total: Math.round(total * 100) / 100,
              free: Math.round(free * 100) / 100,
              percentage
            }
          }
        }
      } catch (error) {
        console.log('Failed to get disk usage via df command:', error)
      }
    }

    // Fallback method using fs.statfs (if available)
    try {
      const stats = await fs.statfs('/')
      const total = (stats.blocks * stats.bsize) / (1024 * 1024 * 1024)
      const free = (stats.bavail * stats.bsize) / (1024 * 1024 * 1024)
      const used = total - free
      const percentage = Math.round((used / total) * 100)

      return {
        used: Math.round(used * 100) / 100,
        total: Math.round(total * 100) / 100,
        free: Math.round(free * 100) / 100,
        percentage
      }
    } catch (statfsError) {
      console.log('Failed to get disk usage via statfs:', statfsError)
    }

    // Windows fallback
    if (process.platform === 'win32') {
      try {
        const { stdout } = await execAsync('wmic logicaldisk where caption="C:" get size,freespace,caption /format:csv')
        const lines = stdout.trim().split('\n').filter(line => line.includes('C:'))
        if (lines.length > 0) {
          const parts = lines[0].split(',')
          if (parts.length >= 3) {
            const free = parseInt(parts[1]) / (1024 * 1024 * 1024)
            const total = parseInt(parts[2]) / (1024 * 1024 * 1024)
            const used = total - free
            const percentage = Math.round((used / total) * 100)

            return {
              used: Math.round(used * 100) / 100,
              total: Math.round(total * 100) / 100,
              free: Math.round(free * 100) / 100,
              percentage
            }
          }
        }
      } catch (winError) {
        console.log('Failed to get disk usage on Windows:', winError)
      }
    }

    // If all methods fail, return default values
    return {
      used: 0,
      total: 0,
      free: 0,
      percentage: 0
    }
  } catch (error) {
    console.error('Error getting disk usage:', error)
    return {
      used: 0,
      total: 0,
      free: 0,
      percentage: 0
    }
  }
}

export async function getSystemResources(): Promise<SystemResources> {
  try {
    const [cpu, ram, disk] = await Promise.all([
      getCPUUsage(),
      getRAMUsage(),
      getDiskUsage()
    ])

    return {
      cpu,
      ram,
      disk,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error fetching system resources:', error)
    return {
      cpu: { overall: 0, cores: [] },
      ram: { used: 0, total: 0, percentage: 0 },
      disk: { used: 0, total: 0, free: 0, percentage: 0 },
      timestamp: Date.now()
    }
  }
}

// 'use server'
//
// import { exec } from 'child_process'
// import { promisify } from 'util'
// import os from 'os'
//
// const execAsync = promisify(exec)
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
// async function getCPUUsage(): Promise<number> {
//   const cpus = os.cpus()
//   const startMeasure = cpus.map(cpu => {
//     const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0)
//     const idle = cpu.times.idle
//     return { total, idle }
//   })
//
//   await new Promise(resolve => setTimeout(resolve, 100))
//
//   const endMeasure = os.cpus().map(cpu => {
//     const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0)
//     const idle = cpu.times.idle
//     return { total, idle }
//   })
//
//   const totalDiff = endMeasure.reduce((acc, end, i) => acc + (end.total - startMeasure[i].total), 0)
//   const idleDiff = endMeasure.reduce((acc, end, i) => acc + (end.idle - startMeasure[i].idle), 0)
//
//   return Math.round(((totalDiff - idleDiff) / totalDiff) * 100)
// }
//
// async function getRAMUsage() {
//   const total = os.totalmem()
//   const free = os.freemem()
//   const used = total - free
//   const percentage = Math.round((used / total) * 100)
//
//   return {
//     used: Math.round(used / 1024 / 1024 / 1024 * 100) / 100,
//     total: Math.round(total / 1024 / 1024 / 1024 * 100) / 100,
//     percentage
//   }
// }
//
// async function getGPUUsage(): Promise<SystemResources['gpu'] | undefined> {
//   try {
//     const { stdout, stderr } = await execAsync('nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total --format=csv,noheader,nounits', { timeout: 5000 })
//
//     if (stderr) {
//       console.log('GPU command stderr:', stderr)
//     }
//
//     if (stdout.includes('Failed to initialize NVML') || stdout.includes('NVIDIA-SMI has failed')) {
//       console.log('NVML initialization failed - GPU monitoring unavailable in this environment')
//       return undefined
//     }
//
//     if (!stdout || stdout.trim() === '') {
//       console.log('GPU command returned empty output')
//       return undefined
//     }
//
//     const lines = stdout.trim().split('\n').filter(line => line.trim() !== '' && !line.includes('Failed to initialize'))
//
//     if (lines.length === 0) {
//       return undefined
//     }
//
//     const firstLine = lines[0].trim()
//     const parts = firstLine.split(',').map(s => s.trim())
//
//     if (parts.length < 3) {
//       console.log('GPU command returned insufficient data:', parts)
//       return undefined
//     }
//
//     const usage = parseInt(parts[0])
//     const memUsed = parseInt(parts[1])
//     const memTotal = parseInt(parts[2])
//
//     if (isNaN(usage) || isNaN(memUsed) || isNaN(memTotal)) {
//       console.log('GPU command returned non-numeric values:', { usage: parts[0], memUsed: parts[1], memTotal: parts[2] })
//       return undefined
//     }
//
//     return {
//       usage,
//       memory: {
//         used: memUsed,
//         total: memTotal
//       }
//     }
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error)
//     if (errorMessage.includes('Failed to initialize NVML') || errorMessage.includes('Unknown Error')) {
//       console.log('GPU monitoring unavailable - NVML initialization failed (common in WSL/Docker/development environments)')
//     } else {
//       console.log('GPU monitoring error:', error)
//     }
//     return undefined
//   }
// }
//
// export async function getSystemResources(): Promise<SystemResources> {
//   try {
//     const [cpu, ram] = await Promise.all([
//       getCPUUsage(),
//       getRAMUsage(),
//       // getGPUUsage()
//     ])
//
//     return {
//       cpu,
//       ram,
//       // gpu,
//       timestamp: Date.now()
//     }
//   } catch (error) {
//     console.error('Error fetching system resources:', error)
//     return {
//       cpu: 0,
//       ram: { used: 0, total: 0, percentage: 0 },
//       timestamp: Date.now()
//     }
//   }
// }