'use client';

import { useEffect, useState } from 'react';
import './MemoryUsageWidget.scss';

const formatBytes = (bytes: number): string => {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const MemoryUsageWidget = ({ interval = 3000 }: { interval?: number }) => {
  const [memory, setMemory] = useState<NodeJS.MemoryUsage | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const updateMemory = () => {
      const usage = process.memoryUsage();
      setMemory(usage);
      setTimestamp(Date.now());
    };

    updateMemory();
    const id = setInterval(updateMemory, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="memory-usage-widget">
      <h3>Memory Usage</h3>
      {memory ? (
        <div className="memory-details">
          <div>
            <strong>RSS:</strong> {formatBytes(memory.rss)}
          </div>
          <div>
            <strong>Heap Total:</strong> {formatBytes(memory.heapTotal)}
          </div>
          <div>
            <strong>Heap Used:</strong> {formatBytes(memory.heapUsed)}
          </div>
          <div>
            <strong>External:</strong> {formatBytes(memory.external)}
          </div>
          <div>
            <strong>Array Buffers:</strong> {formatBytes(memory.arrayBuffers)}
          </div>
          <div className="updated-time">Last updated: {timestamp && new Date(timestamp).toLocaleTimeString()}</div>
        </div>
      ) : (
        <div className="loading">Loading memory data...</div>
      )}
    </div>
  );
};

export default MemoryUsageWidget;
