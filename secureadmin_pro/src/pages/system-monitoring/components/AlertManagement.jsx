import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertManagement = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const alerts = [
    {
      id: 'alert-001',
      title: 'High Memory Usage Detected',
      description: 'Memory usage has exceeded 85% threshold on production server',
      severity: 'critical',
      status: 'active',
      timestamp: new Date(Date.now() - 300000),
      source: 'System Monitor',
      category: 'Performance',
      affectedSystems: ['Web Server 1', 'Database Server'],
      acknowledgedBy: null,
      escalated: true
    },
    {
      id: 'alert-002',
      title: 'API Response Time Degradation',
      description: 'Average API response time increased to 2.5 seconds',
      severity: 'warning',
      status: 'acknowledged',
      timestamp: new Date(Date.now() - 900000),
      source: 'API Gateway',
      category: 'Performance',
      affectedSystems: ['API Gateway'],
      acknowledgedBy: 'John Smith',
      escalated: false
    },
    {
      id: 'alert-003',
      title: 'Failed Login Attempts',
      description: 'Multiple failed login attempts detected from IP 192.168.1.100',
      severity: 'warning',
      status: 'resolved',
      timestamp: new Date(Date.now() - 1800000),
      source: 'Security Monitor',
      category: 'Security',
      affectedSystems: ['Authentication Service'],
      acknowledgedBy: 'Sarah Johnson',
      escalated: false
    },
    {
      id: 'alert-004',
      title: 'Disk Space Low',
      description: 'Available disk space on /var/log partition is below 10%',
      severity: 'warning',
      status: 'active',
      timestamp: new Date(Date.now() - 3600000),
      source: 'System Monitor',
      category: 'Storage',
      affectedSystems: ['Log Server'],
      acknowledgedBy: null,
      escalated: false
    },
    {
      id: 'alert-005',
      title: 'Database Connection Pool Exhausted',
      description: 'All database connections are in use, new requests are being queued',
      severity: 'critical',
      status: 'active',
      timestamp: new Date(Date.now() - 120000),
      source: 'Database Monitor',
      category: 'Database',
      affectedSystems: ['Primary Database'],
      acknowledgedBy: null,
      escalated: true
    }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-secondary-500';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-50 border-error-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'info':
        return 'bg-primary-50 border-primary-200';
      default:
        return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'info':
        return 'bg-primary text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'acknowledged':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'resolved':
        return 'bg-success-100 text-success-700 border-success-200';
      default:
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'AlertTriangle';
      case 'acknowledged':
        return 'Clock';
      case 'resolved':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus;
    return severityMatch && statusMatch;
  });

  const handleAcknowledge = (alertId) => {
    console.log('Acknowledging alert:', alertId);
  };

  const handleResolve = (alertId) => {
    console.log('Resolving alert:', alertId);
  };

  const handleEscalate = (alertId) => {
    console.log('Escalating alert:', alertId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Alert Management</h2>
          <p className="text-sm text-text-secondary mt-1">
            Monitor and manage system alerts with severity-based filtering
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {severityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
            <Icon name="Plus" size={16} />
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Alerts</p>
              <p className="text-xl font-bold text-text-primary">
                {alerts.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Critical</p>
              <p className="text-xl font-bold text-text-primary">
                {alerts.filter(a => a.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Acknowledged</p>
              <p className="text-xl font-bold text-text-primary">
                {alerts.filter(a => a.status === 'acknowledged').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Resolved</p>
              <p className="text-xl font-bold text-text-primary">
                {alerts.filter(a => a.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="divide-y divide-border">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-secondary-50 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getSeverityBg(alert.severity)}`}>
                    <Icon name="AlertTriangle" size={20} className={getSeverityColor(alert.severity)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-text-primary">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusBadge(alert.status)}`}>
                        <Icon name={getStatusIcon(alert.status)} size={12} className="inline mr-1" />
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                      {alert.escalated && (
                        <span className="px-2 py-1 bg-error-100 text-error-700 border border-error-200 rounded text-xs font-medium">
                          <Icon name="ArrowUp" size={12} className="inline mr-1" />
                          Escalated
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-text-secondary mb-3">{alert.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Tag" size={12} />
                        <span>{alert.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Monitor" size={12} />
                        <span>{alert.source}</span>
                      </div>
                      {alert.acknowledgedBy && (
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>Acked by {alert.acknowledgedBy}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-text-secondary mb-1">Affected Systems:</p>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedSystems.map((system, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                            {system}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {alert.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-warning hover:bg-warning-50 border border-warning-200 rounded-lg transition-smooth"
                      >
                        <Icon name="Clock" size={14} />
                        <span>Acknowledge</span>
                      </button>
                      <button
                        onClick={() => handleEscalate(alert.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-error hover:bg-error-50 border border-error-200 rounded-lg transition-smooth"
                      >
                        <Icon name="ArrowUp" size={14} />
                        <span>Escalate</span>
                      </button>
                    </>
                  )}
                  
                  {alert.status === 'acknowledged' && (
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-sm text-success hover:bg-success-50 border border-success-200 rounded-lg transition-smooth"
                    >
                      <Icon name="CheckCircle" size={14} />
                      <span>Resolve</span>
                    </button>
                  )}

                  <button className="p-2 hover:bg-secondary-100 rounded-lg transition-smooth">
                    <Icon name="MoreVertical" size={16} className="text-secondary-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No Alerts Found</h3>
            <p className="text-text-secondary">
              {selectedSeverity !== 'all' || selectedStatus !== 'all' ?'No alerts match your current filters.' :'All systems are running smoothly.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertManagement;