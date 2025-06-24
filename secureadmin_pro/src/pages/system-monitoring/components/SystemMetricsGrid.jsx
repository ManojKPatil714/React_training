import React from 'react';
import Icon from 'components/AppIcon';

const SystemMetricsGrid = ({ timeRange }) => {
  const systemMetrics = [
    {
      id: 'cpu',
      title: 'CPU Usage',
      value: 23,
      unit: '%',
      status: 'good',
      trend: 'up',
      trendValue: 2.3,
      icon: 'Cpu',
      description: 'Current processor utilization',
      threshold: { warning: 70, critical: 90 }
    },
    {
      id: 'memory',
      title: 'Memory Usage',
      value: 67,
      unit: '%',
      status: 'warning',
      trend: 'up',
      trendValue: 5.2,
      icon: 'HardDrive',
      description: 'RAM consumption across all processes',
      threshold: { warning: 70, critical: 85 }
    },
    {
      id: 'disk',
      title: 'Disk Space',
      value: 45,
      unit: '%',
      status: 'good',
      trend: 'stable',
      trendValue: 0.1,
      icon: 'Database',
      description: 'Storage utilization on primary drive',
      threshold: { warning: 80, critical: 95 }
    },
    {
      id: 'network',
      title: 'Network I/O',
      value: 156,
      unit: 'Mbps',
      status: 'good',
      trend: 'down',
      trendValue: -12.4,
      icon: 'Wifi',
      description: 'Combined inbound and outbound traffic',
      threshold: { warning: 800, critical: 950 }
    },
    {
      id: 'load',
      title: 'System Load',
      value: 1.2,
      unit: '',
      status: 'good',
      trend: 'stable',
      trendValue: 0.05,
      icon: 'Activity',
      description: 'Average system load over 15 minutes',
      threshold: { warning: 2.0, critical: 4.0 }
    },
    {
      id: 'temperature',
      title: 'Temperature',
      value: 42,
      unit: '°C',
      status: 'good',
      trend: 'up',
      trendValue: 1.8,
      icon: 'Thermometer',
      description: 'CPU core temperature average',
      threshold: { warning: 70, critical: 85 }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
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
      case 'good':
        return 'bg-success-50 border-success-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'critical':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      case 'stable':
        return 'text-secondary-500';
      default:
        return 'text-secondary-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">System Metrics</h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={14} />
          <span>Real-time data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {systemMetrics.map((metric) => (
          <div
            key={metric.id}
            className={`
              bg-surface border rounded-lg p-6 hover:shadow-elevation transition-smooth cursor-pointer
              ${getStatusBg(metric.status)}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusBg(metric.status)}`}>
                <Icon name={metric.icon} size={24} className={getStatusColor(metric.status)} />
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getTrendIcon(metric.trend)} 
                  size={16} 
                  className={getTrendColor(metric.trend)} 
                />
                <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                </span>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="font-medium text-text-primary mb-1">{metric.title}</h3>
              <p className="text-xs text-text-secondary">{metric.description}</p>
            </div>

            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold text-text-primary">
                {metric.value}
              </span>
              <span className="text-sm text-text-secondary">{metric.unit}</span>
            </div>

            {/* Progress Bar */}
            {metric.unit === '%' && (
              <div className="space-y-2">
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.status === 'good' ? 'bg-success' :
                      metric.status === 'warning' ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>0%</span>
                  <span className="text-warning">Warning: {metric.threshold.warning}%</span>
                  <span className="text-error">Critical: {metric.threshold.critical}%</span>
                </div>
              </div>
            )}

            {/* Mini Chart Placeholder */}
            <div className="mt-4 h-12 bg-secondary-50 rounded flex items-center justify-center">
              <span className="text-xs text-text-secondary">Mini trend chart</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMetricsGrid;