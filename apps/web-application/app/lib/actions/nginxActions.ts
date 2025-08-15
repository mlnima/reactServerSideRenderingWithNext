'use server';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';

const execAsync = promisify(exec);

const ACCESS_LOG_PATH = '/var/log/nginx/access.log';
const ERROR_LOG_PATH = '/var/log/nginx/error.log';
const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL?.replace(/^https?:\/\//, '') || '';

export interface AccessLogEntry {
  id: string;
  ip: string;
  timestamp: string;
  method: string;
  path: string;
  protocol: string;
  status: number;
  size: number;
  referer: string;
  userAgent: string;
}

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  client?: string;
  server?: string;
  request?: string;
  host?: string;
}

const parseAccessLogLine = (line: string): AccessLogEntry | null => {
  const regex = /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\d{3}) (\d+) "([^"]*)" "([^"]*)"/;
  const match = line.match(regex);
  if (!match) return null;

  return {
    id: `${match[2]}-${match[1]}-${Math.random()}`,
    ip: match[1],
    timestamp: new Date(match[2].replace(':', ' ')).toISOString(),
    method: match[3],
    path: match[4],
    protocol: match[5],
    status: parseInt(match[6], 10),
    size: parseInt(match[7], 10),
    referer: match[8],
    userAgent: match[9],
  };
};

const parseErrorLogLine = (line: string): ErrorLogEntry | null => {
  const regex = /^(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] .*?: (.*)/;
  const match = line.match(regex);
  if (!match) return null;

  const entry: ErrorLogEntry = {
    id: `${match[1]}-${Math.random()}`,
    timestamp: new Date(match[1]).toISOString(),
    level: match[2],
    message: match[3],
  };

  const clientMatch = entry.message.match(/client: (\S+?),/);
  if (clientMatch) entry.client = clientMatch[1];

  const serverMatch = entry.message.match(/server: "([^"]+)",/);
  if (serverMatch) entry.server = serverMatch[1];

  const requestMatch = entry.message.match(/request: "([^"]+)",/);
  if (requestMatch) entry.request = requestMatch[1];

  const hostMatch = entry.message.match(/host: "([^"]+)"/);
  if (hostMatch) entry.host = hostMatch[1];

  return entry;
};

export const getNginxLogs = async (options: {
  logType: 'access' | 'error';
  limit: number;
}): Promise<(AccessLogEntry | ErrorLogEntry)[]> => {
  try {
    const filePath = options.logType === 'access' ? ACCESS_LOG_PATH : ERROR_LOG_PATH;
    const parser = options.logType === 'access' ? parseAccessLogLine : parseErrorLogLine;

    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.trim().split('\n');

    const relevantLines = PRODUCTION_URL ? lines.filter((line) => line.includes(PRODUCTION_URL)) : lines;

    const parsedLogs = relevantLines
      .reverse()
      .slice(0, options.limit * 2)
      .map((line) => parser(line))
      .filter((log): log is AccessLogEntry | ErrorLogEntry => log !== null)
      .slice(0, options.limit);

    return parsedLogs;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EACCES') {
      throw new Error(`Permission denied for ${options.logType} log file.`);
    }
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`${options.logType} log file not found.`);
    }
    throw new Error(`Failed to process ${options.logType} log.`);
  }
};

export const getBlockedIps = async (): Promise<string[]> => {
  try {
    const { stdout } = await execAsync('sudo ufw status | grep DENY');
    const ips = stdout
      .split('\n')
      .map((line) => line.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/))
      .filter(Boolean)
      .map((match) => match![0]);
    return [...new Set(ips)];
  } catch (error) {
    return [];
  }
};

const isValidIp = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex =
    /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export const manageIpFirewall = async (ip: string, action: 'block' | 'unblock'): Promise<{ success: boolean; message: string }> => {
  if (!isValidIp(ip)) {
    return { success: false, message: 'Invalid IP address format.' };
  }

  const command = action === 'block' ? `sudo ufw insert 1 deny from ${ip}` : `sudo ufw delete deny from ${ip}`;

  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      if (stderr.includes('Operation not possible')) {
        return { success: true, message: `Rule for ${ip} already exists or does not exist.` };
      }
      return { success: false, message: stderr };
    }
    return { success: true, message: stdout || `Successfully ${action}ed ${ip}.` };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('command not found')) {
        return { success: false, message: '`ufw` command not found.' };
      }
      if (error.message.includes('Permission denied')) {
        return { success: false, message: 'Permission denied for ufw command.' };
      }
      return { success: false, message: error.message };
    }
    return { success: false, message: `An unknown error occurred.` };
  }
};
