'use server'

import { exec } from 'child_process'
import { promisify } from 'util'
import { verifySession } from '@lib/dal';
import { errorResponse } from '@lib/actions/response';

const execAsync = promisify(exec)

const executeCommand = async (command: string)=> {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }


    const { stdout, stderr } = await execAsync(command, {
      timeout: 30000,
      maxBuffer: 1024 * 1024
    })

    return {
      success: true,
      stdout: stdout.trim(),
      stderr: stderr.trim()
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      stdout: error.stdout?.trim() || '',
      stderr: error.stderr?.trim() || ''
    }
  }
}

export default executeCommand