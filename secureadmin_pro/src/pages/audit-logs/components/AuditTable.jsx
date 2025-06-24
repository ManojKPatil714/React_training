import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AuditTable = ({ logs, selectedLogs, onSelectionChange, viewMode }) => {
  const [expandedLog, setExpandedLog] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(logs.map(log => log.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectLog = (logId, checked) => {
    if (checked) {
      onSelectionChange([...selectedLogs, logId]);
    } else {
      onSelectionChange(selectedLogs.filter(id => id !== logId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortConfig.key === 'timestamp') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    }
    
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    
    if (sortConfig.direction === 'asc') {
      return aValue.toString().localeCompare(bValue.toString());
    }
    return bValue.toString().localeCompare(aValue.toString());
  });

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'HIGH': return 'text-error bg-error-50 border-error-200';
      case 'MEDIUM': return 'text-warning bg-warning-50 border-warning-200';
      case 'LOW': return 'text-success bg-success-50 border-success-200';
      default: return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-success bg-success-50';
      case 'FAILED': return 'text-error bg-error-50';
      case 'PENDING': return 'text-warning bg-warning-50';
      default: return 'text-secondary bg-secondary-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (viewMode === 'timeline') {
    return (
      <div className="space-y-4">
        {sortedLogs.map((log) => (
          <div key={log.id} className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedLogs.includes(log.id)}
                  onChange={(e) => handleSelectLog(log.id, e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(log.riskLevel)}`}>
                  {log.riskLevel}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                  {log.status}
                </div>
              </div>
              <span className="text-sm text-text-secondary">{formatTimestamp(log.timestamp)}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">{log.action.replace(/_/g, ' ')}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} className="text-secondary-500" />
                    <span className="text-text-secondary">User:</span>
                    <span className="font-medium">{log.user.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={14} className="text-secondary-500" />
                    <span className="text-text-secondary">IP:</span>
                    <span className="font-mono">{log.ipAddress}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Database" size={14} className="text-secondary-500" />
                    <span className="text-text-secondary">Resource:</span>
                    <span className="font-medium">{log.resource}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-secondary-500" />
                    <span className="text-text-secondary">Duration:</span>
                    <span>{log.metadata.duration}ms</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              className="flex items-center space-x-2 text-primary hover:text-primary-700 text-sm font-medium transition-smooth"
            >
              <Icon name={expandedLog === log.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span>{expandedLog === log.id ? 'Hide Details' : 'Show Details'}</span>
            </button>

            {expandedLog === log.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Event Details</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(log.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium text-right">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Technical Metadata</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Request ID:</span>
                        <span className="font-mono text-xs">{log.metadata.requestId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Response Code:</span>
                        <span className="font-medium">{log.metadata.responseCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">User Agent:</span>
                        <span className="font-mono text-xs truncate max-w-48" title={log.userAgent}>
                          {log.userAgent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedLogs.length === logs.length && logs.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-2">
                  <span>Timestamp</span>
                  <Icon 
                    name={sortConfig.key === 'timestamp' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                    className="text-secondary-500" 
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Action</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Resource</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">IP Address</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Risk</th>
              <th className="w-12 px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedLogs.map((log) => (
              <React.Fragment key={log.id}>
                <tr className="hover:bg-secondary-50 transition-smooth">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={(e) => handleSelectLog(log.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-primary-700" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{log.user.name}</div>
                        <div className="text-xs text-text-secondary">{log.user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {log.action.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">{log.resource}</td>
                  <td className="px-6 py-4 text-sm font-mono text-text-primary">{log.ipAddress}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(log.riskLevel)}`}>
                      {log.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                      className="p-1 rounded hover:bg-secondary-100 transition-smooth"
                    >
                      <Icon name={expandedLog === log.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-secondary-500" />
                    </button>
                  </td>
                </tr>
                {expandedLog === log.id && (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 bg-secondary-50">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-text-primary mb-3">Event Details</h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(log.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-medium">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-3">Technical Metadata</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Request ID:</span>
                              <span className="font-mono text-xs">{log.metadata.requestId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Duration:</span>
                              <span className="font-medium">{log.metadata.duration}ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Response Code:</span>
                              <span className="font-medium">{log.metadata.responseCode}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-3">User Agent</h4>
                          <p className="text-sm text-text-secondary font-mono break-all">{log.userAgent}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedLogs.map((log) => (
          <div key={log.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <input
                type="checkbox"
                checked={selectedLogs.includes(log.id)}
                onChange={(e) => handleSelectLog(log.id, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
              />
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                  {log.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(log.riskLevel)}`}>
                  {log.riskLevel}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">{log.action.replace(/_/g, ' ')}</span>
                <span className="text-xs text-text-secondary">{formatTimestamp(log.timestamp)}</span>
              </div>
              <div className="text-sm text-text-secondary">
                <span className="font-medium">{log.user.name}</span> • {log.resource}
              </div>
              <div className="text-xs font-mono text-text-secondary">{log.ipAddress}</div>
            </div>

            <button
              onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              className="flex items-center space-x-2 text-primary hover:text-primary-700 text-sm font-medium transition-smooth"
            >
              <Icon name={expandedLog === log.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span>{expandedLog === log.id ? 'Hide Details' : 'Show Details'}</span>
            </button>

            {expandedLog === log.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Event Details</h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(log.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Technical Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Request ID:</span>
                      <span className="font-mono text-xs">{log.metadata.requestId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Duration:</span>
                      <span className="font-medium">{log.metadata.duration}ms</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedLogs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No audit logs found</h3>
          <p className="text-text-secondary">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default AuditTable;