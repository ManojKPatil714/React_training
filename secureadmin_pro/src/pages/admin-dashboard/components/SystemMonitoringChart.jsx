import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from 'components/AppIcon';

const SystemMonitoringChart = () => {
  const [activeTab, setActiveTab] = useState('cpu');

  // Mock data for different metrics
  const cpuData = [
    { time: '00:00', value: 23, label: 'CPU Usage' },
    { time: '04:00', value: 18, label: 'CPU Usage' },
    { time: '08:00', value: 45, label: 'CPU Usage' },
    { time: '12:00', value: 67, label: 'CPU Usage' },
    { time: '16:00', value: 52, label: 'CPU Usage' },
    { time: '20:00', value: 38, label: 'CPU Usage' },
    { time: '24:00', value: 25, label: 'CPU Usage' }
  ];

  const memoryData = [
    { time: '00:00', value: 45, label: 'Memory Usage' },
    { time: '04:00', value: 42, label: 'Memory Usage' },
    { time: '08:00', value: 58, label: 'Memory Usage' },
    { time: '12:00', value: 72, label: 'Memory Usage' },
    { time: '16:00', value: 68, label: 'Memory Usage' },
    { time: '20:00', value: 55, label: 'Memory Usage' },
    { time: '24:00', value: 48, label: 'Memory Usage' }
  ];

  const networkData = [
    { time: '00:00', value: 12, label: 'Network I/O' },
    { time: '04:00', value: 8, label: 'Network I/O' },
    { time: '08:00', value: 35, label: 'Network I/O' },
    { time: '12:00', value: 48, label: 'Network I/O' },
    { time: '16:00', value: 42, label: 'Network I/O' },
    { time: '20:00', value: 28, label: 'Network I/O' },
    { time: '24:00', value: 15, label: 'Network I/O' }
  ];

  const databaseData = [
    { time: '00:00', value: 156, label: 'DB Response (ms)' },
    { time: '04:00', value: 134, label: 'DB Response (ms)' },
    { time: '08:00', value: 189, label: 'DB Response (ms)' },
    { time: '12:00', value: 245, label: 'DB Response (ms)' },
    { time: '16:00', value: 198, label: 'DB Response (ms)' },
    { time: '20:00', value: 167, label: 'DB Response (ms)' },
    { time: '24:00', value: 145, label: 'DB Response (ms)' }
  ];

  const tabs = [
    { id: 'cpu', label: 'CPU', icon: 'Cpu', data: cpuData, color: '#3B82F6', unit: '%' },
    { id: 'memory', label: 'Memory', icon: 'HardDrive', data: memoryData, color: '#059669', unit: '%' },
    { id: 'network', label: 'Network', icon: 'Wifi', data: networkData, color: '#D97706', unit: 'MB/s' },
    { id: 'database', label: 'Database', icon: 'Database', data: databaseData, color: '#DC2626', unit: 'ms' }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const currentValue = activeTabData.data[activeTabData.data.length - 1].value;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation">
          <p className="text-sm font-medium text-text-primary">{`Time: ${label}`}</p>
          <p className="text-sm text-primary">
            {`${payload[0].payload.label}: ${payload[0].value}${activeTabData.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">System Monitoring</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">Live</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Current Value Display */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name={activeTabData.icon} size={20} className="text-secondary-500" />
              <span className="text-sm font-medium text-text-primary">Current {activeTabData.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-text-primary">
                {currentValue}{activeTabData.unit}
              </span>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                currentValue < 50 ? 'bg-success-100 text-success-700' :
                currentValue < 80 ? 'bg-warning-100 text-warning-700': 'bg-error-100 text-error-700'
              }`}>
                {currentValue < 50 ? 'Normal' : currentValue < 80 ? 'Moderate' : 'High'}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTabData.data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeTabData.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={activeTabData.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${activeTabData.unit}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={activeTabData.color}
                strokeWidth={2}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Indicators */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {Math.min(...activeTabData.data.map(d => d.value))}{activeTabData.unit}
            </div>
            <div className="text-xs text-text-secondary">Min (24h)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {Math.round(activeTabData.data.reduce((sum, d) => sum + d.value, 0) / activeTabData.data.length)}{activeTabData.unit}
            </div>
            <div className="text-xs text-text-secondary">Avg (24h)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {Math.max(...activeTabData.data.map(d => d.value))}{activeTabData.unit}
            </div>
            <div className="text-xs text-text-secondary">Max (24h)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringChart;