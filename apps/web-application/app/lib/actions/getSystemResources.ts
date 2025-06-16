'use server'

import { exec } from 'child_process'
import { promisify } from 'util'
import os from 'os'

const execAsync = promisify(exec)

interface SystemResources {
  cpu: number
  ram: {
    used: number
    total: number
    percentage: number
  }
  gpu?: {
    usage: number
    memory: {
      used: number
      total: number
    }
  }
  timestamp: number
}

async function getCPUUsage(): Promise<number> {
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

  const totalDiff = endMeasure.reduce((acc, end, i) => acc + (end.total - startMeasure[i].total), 0)
  const idleDiff = endMeasure.reduce((acc, end, i) => acc + (end.idle - startMeasure[i].idle), 0)

  return Math.round(((totalDiff - idleDiff) / totalDiff) * 100)
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

async function getGPUUsage(): Promise<SystemResources['gpu'] | undefined> {
  try {
    const { stdout, stderr } = await execAsync('nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total --format=csv,noheader,nounits', { timeout: 5000 })

    if (stderr) {
      console.log('GPU command stderr:', stderr)
    }

    if (stdout.includes('Failed to initialize NVML') || stdout.includes('NVIDIA-SMI has failed')) {
      console.log('NVML initialization failed - GPU monitoring unavailable in this environment')
      return undefined
    }

    if (!stdout || stdout.trim() === '') {
      console.log('GPU command returned empty output')
      return undefined
    }

    const lines = stdout.trim().split('\n').filter(line => line.trim() !== '' && !line.includes('Failed to initialize'))

    if (lines.length === 0) {
      return undefined
    }

    const firstLine = lines[0].trim()
    const parts = firstLine.split(',').map(s => s.trim())

    if (parts.length < 3) {
      console.log('GPU command returned insufficient data:', parts)
      return undefined
    }

    const usage = parseInt(parts[0])
    const memUsed = parseInt(parts[1])
    const memTotal = parseInt(parts[2])

    if (isNaN(usage) || isNaN(memUsed) || isNaN(memTotal)) {
      console.log('GPU command returned non-numeric values:', { usage: parts[0], memUsed: parts[1], memTotal: parts[2] })
      return undefined
    }

    return {
      usage,
      memory: {
        used: memUsed,
        total: memTotal
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('Failed to initialize NVML') || errorMessage.includes('Unknown Error')) {
      console.log('GPU monitoring unavailable - NVML initialization failed (common in WSL/Docker/development environments)')
    } else {
      console.log('GPU monitoring error:', error)
    }
    return undefined
  }
}

export async function getSystemResources(): Promise<SystemResources> {
  try {
    const [cpu, ram] = await Promise.all([
      getCPUUsage(),
      getRAMUsage(),
      // getGPUUsage()
    ])

    return {
      cpu,
      ram,
      // gpu,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error fetching system resources:', error)
    return {
      cpu: 0,
      ram: { used: 0, total: 0, percentage: 0 },
      timestamp: Date.now()
    }
  }
}