import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ApplicationMonitoring = ({ timeRange }) => {
  const [selectedApp, setSelectedApp] = useState('all');

  const applicationMetrics = [
    {
      id: 'database',
      name: 'Database Server',
      status: 'healthy',
      responseTime: 45,
      errorRate: 0.02,
      throughput: 1250,
      uptime: 99.98,
      connections: 156,
      icon: 'Database',
      details: {
        queries: 15420,
        slowQueries: 3,
        cacheHitRate: 94.5,
        diskUsage: 67
      }
    },
    {
      id: 'api',
      name: 'API Gateway',
      status: 'warning',
      responseTime: 120,
      errorRate: 2.1,
      throughput: 890,
      uptime: 99.85,
      connections: 234,
      icon: 'Globe',
      details: {
        requests: 45680,
        rateLimited: 12,
        authFailures: 8,
        avgLatency: 95
      }
    },
    {
      id: 'cache',
      name: 'Redis Cache',
      status: 'healthy',
      responseTime: 12,
      errorRate: 0.01,
      throughput: 2100,
      uptime: 99.99,
      connections: 89,
      icon: 'Zap',
      details: {
        hitRate: 96.8,
        memoryUsage: 45,
        evictions: 2,
        keyspace: 15420
      }
    },
    {
      id: 'queue',
      name: 'Message Queue',
      status: 'healthy',
      responseTime: 8,
      errorRate: 0.05,
      throughput: 560,
      uptime: 99.95,
      connections: 45,
      icon: 'MessageSquare',
      details: {
        messages: 8950,
        pending: 12,
        processed: 8938,
        failed: 0
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-secondary-500';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success-50 border-success-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'critical':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'critical':
        return 'bg-error text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-lg font-semibold text-text-primary">Application Monitoring</h2>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Applications</option>
            {applicationMetrics.map((app) => (
              <option key={app.id} value={app.id}>{app.name}</option>
            ))}
          </select>
          
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-smooth">
            <Icon name="Settings" size={16} />
            <span>Configure</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {applicationMetrics
          .filter(app => selectedApp === 'all' || app.id === selectedApp)
          .map((app) => (
            <div key={app.id} className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevation transition-smooth">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(app.status)}`}>
                    <Icon name={app.icon} size={20} className={getStatusColor(app.status)} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{app.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <span className="text-xs text-text-secondary">
                        Uptime: {app.uptime}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-secondary-100 rounded-lg transition-smooth">
                  <Icon name="MoreVertical" size={16} className="text-secondary-500" />
                </button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">Response Time</p>
                  <p className="text-lg font-semibold text-text-primary">{app.responseTime}ms</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">Error Rate</p>
                  <p className="text-lg font-semibold text-text-primary">{app.errorRate}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">Throughput</p>
                  <p className="text-lg font-semibold text-text-primary">{app.throughput}/min</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">Connections</p>
                  <p className="text-lg font-semibold text-text-primary">{app.connections}</p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium text-text-primary mb-3">Detailed Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(app.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-xs font-medium text-text-primary">
                        {typeof value === 'number' && key.includes('Rate') ? `${value}%` : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="mt-4 h-24 bg-secondary-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="BarChart3" size={24} className="text-secondary-400 mx-auto mb-1" />
                  <span className="text-xs text-text-secondary">Performance Chart</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary-700 transition-smooth">
                  <Icon name="Eye" size={14} />
                  <span>View Logs</span>
                </button>
                <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary-700 transition-smooth">
                  <Icon name="Settings" size={14} />
                  <span>Configure</span>
                </button>
                <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary-700 transition-smooth">
                  <Icon name="Download" size={14} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationMonitoring;