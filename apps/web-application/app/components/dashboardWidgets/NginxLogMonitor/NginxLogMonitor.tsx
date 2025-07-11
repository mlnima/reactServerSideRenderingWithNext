'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserShield,
  faBan,
  faCheckCircle,
  faSpinner,
  faExclamationTriangle,
  faSearch,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import './NginxLogMonitor.scss';
import {
  getNginxLogs,
  getBlockedIps,
  manageIpFirewall,
  AccessLogEntry,
  ErrorLogEntry,
} from '@lib/actions/nginxActions';

type LogEntry = AccessLogEntry | ErrorLogEntry
type LogType = 'access' | 'error'

const isAccessLog = (log: LogEntry): log is AccessLogEntry => 'status' in log;
const isBot = (userAgent: string = ''): boolean => /bot|spider|crawl|slurp|yandex/i.test(userAgent);
const limitOptions = [20, 50, 100, 200, 500, 1000];

const LogItem = ({ log, blockedIps, onToggleBlock, isBlocking }: {
  log: LogEntry,
  blockedIps: string[],
  onToggleBlock: (ip: string, action: 'block' | 'unblock') => void,
  isBlocking: string | null
}) => {
  const ip = isAccessLog(log) ? log.ip : log.client;
  const isBlocked = ip ? blockedIps.includes(ip) : false;
  const isCurrentlyProcessing = isBlocking === ip;

  const getStatusClass = (status: number) => {
    if (status >= 500) return 'status-5xx';
    if (status >= 400) return 'status-4xx';
    if (status >= 300) return 'status-3xx';
    if (status >= 200) return 'status-2xx';
    return '';
  };

  const getLevelClass = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes('crit') || lowerLevel.includes('error')) return 'level-error';
    if (lowerLevel.includes('warn')) return 'level-warn';
    return '';
  };

  const handleBlockClick = () => {
    if (ip) {
      onToggleBlock(ip, isBlocked ? 'unblock' : 'block');
    }
  };

  return (
    <div className={`log-entry ${isAccessLog(log) ? getStatusClass(log.status) : getLevelClass(log.level)}`}>
      {isAccessLog(log) ? (
        <>
          <span className={`log-status ${getStatusClass(log.status)}`}>{log.status}</span>
          <span className="log-method">{log.method}</span>
          <span className="log-path">{log.path}</span>
          {ip && <span className="log-ip">{ip}</span>}
          <span className="log-user-agent">
            {isBot(log.userAgent) && <FontAwesomeIcon icon={faUserShield} className="bot-icon" title="Bot Detected" />}
            {log.userAgent}
          </span>
        </>
      ) : (
        <>
          <span className={`log-level level-${log.level.toLowerCase()}`}>{log.level.toUpperCase()}</span>
          {ip && <span className="log-ip">{ip}</span>}
          <span className="log-message">{log.message}</span>
        </>
      )}
      {ip && (
        <div className="log-actions">
          <button
            onClick={handleBlockClick}
            className={isBlocked ? 'btn-unblock' : 'btn-block'}
            disabled={isCurrentlyProcessing}
            title={isBlocked ? `Unblock ${ip}` : `Block ${ip}`}
          >
            {isCurrentlyProcessing ? <FontAwesomeIcon icon={faSpinner} spin /> : (isBlocked ?
              <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faBan} />)}
            {isBlocked ? ' Unblock' : ' Block'}
          </button>
        </div>
      )}
    </div>
  );
};

const NginxMonitor = ({ interval = 5000 }: { interval?: number }) => {
  const [show, setShow] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [blockedIps, setBlockedIps] = useState<string[]>([]);
  const [logType, setLogType] = useState<LogType>('access');
  const [limit, setLimit] = useState<number>(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [excludeTerm, setExcludeTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isBlocking, setIsBlocking] = useState<string | null>(null);

  const fetchLogsAndIps = useCallback(async () => {
    if (document.hidden) return;
    try {
      setLoading(true);
      const [fetchedLogs, fetchedIps] = await Promise.all([
        getNginxLogs({ logType, limit }),
        getBlockedIps(),
      ]);
      setLogs(fetchedLogs as LogEntry[]);
      setBlockedIps(fetchedIps);
      setError(null);
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [logType, limit]);

  useEffect(() => {
    if (show){
      fetchLogsAndIps();
      const intervalId = setInterval(fetchLogsAndIps, interval);
      return () => clearInterval(intervalId);
    }
  }, [fetchLogsAndIps, interval,show]);

  const handleToggleBlock = async (ip: string, action: 'block' | 'unblock') => {
    setIsBlocking(ip);
    const result = await manageIpFirewall(ip, action);
    if (!result.success) {
      setError(`Firewall Error: ${result.message}`);
    }
    await fetchLogsAndIps();
    setIsBlocking(null);
  };


  const filteredLogs = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const excludeList = ['/socket.io', '/admin', ...excludeTerm.split(',').map(a => a.trim().toLowerCase())];

    return logs
      .filter(log => {
        const logString = JSON.stringify(log).toLowerCase();
        return !excludeList.some(exclude => logString.includes(exclude));
      })
      .filter(log => {
        if (!searchTerm) return true;
        const logString = JSON.stringify(log).toLowerCase();
        return logString.includes(lowerSearch);
      });
  }, [logs, searchTerm, excludeTerm]);

  return (
    <div className="nginx-monitor">
      <div>
        <button className={'btn btn-primary'} onClick={() => setShow(!show)}> show logs</button>

      </div>

      {show && <>


        <div className="monitor-header">
          <h3>Nginx Monitor</h3>
          <div className="last-updated">
            {loading && !lastUpdated ? <FontAwesomeIcon icon={faSpinner} spin /> :
              lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'N/A'
            }
          </div>
        </div>
        <div className="log-controls">
          <div className="control-group tabs">
            <button onClick={() => setLogType('access')} className={logType === 'access' ? 'active' : ''}>Access
            </button>
            <button onClick={() => setLogType('error')} className={logType === 'error' ? 'active' : ''}>Error</button>
          </div>
          <div className="control-group">
            <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
              {limitOptions.map(opt => <option key={opt} value={opt}>Show {opt}</option>)}
            </select>
          </div>
          <div className="control-group">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search..." value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="control-group">
            <FontAwesomeIcon icon={faFilter} />
            <input type="text" placeholder="Exclude 'socket.io'..." value={excludeTerm}
                   onChange={e => setExcludeTerm(e.target.value)} />
          </div>
        </div>
        <div className="log-list-container">
          {loading && logs.length === 0 && <div className="state-container">Loading logs...</div>}
          {error &&
            <div className="state-container error-state"><FontAwesomeIcon icon={faExclamationTriangle} /> {error}</div>}
          {!loading && !error && filteredLogs.length === 0 && <div className="state-container">No logs found.</div>}
          {filteredLogs.map(log => (
            <LogItem
              key={log.id}
              log={log}
              blockedIps={blockedIps}
              onToggleBlock={handleToggleBlock}
              isBlocking={isBlocking}
            />
          ))}
        </div>
      </>
      }
    </div>
  );
};

export default NginxMonitor;