import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PerformanceCharts = ({ timeRange }) => {
  const [selectedChart, setSelectedChart] = useState('cpu');

  const chartOptions = [
    { value: 'cpu', label: 'CPU Usage', icon: 'Cpu' },
    { value: 'memory', label: 'Memory Usage', icon: 'HardDrive' },
    { value: 'network', label: 'Network I/O', icon: 'Wifi' },
    { value: 'disk', label: 'Disk I/O', icon: 'Database' }
  ];

  const performanceData = {
    cpu: {
      title: 'CPU Usage Over Time',
      unit: '%',
      current: 23,
      average: 28,
      peak: 45,
      trend: 'stable',
      data: [
        { time: '00:00', value: 25 },
        { time: '00:15', value: 28 },
        { time: '00:30', value: 22 },
        { time: '00:45', value: 31 },
        { time: '01:00', value: 23 }
      ]
    },
    memory: {
      title: 'Memory Usage Over Time',
      unit: '%',
      current: 67,
      average: 62,
      peak: 78,
      trend: 'increasing',
      data: [
        { time: '00:00', value: 58 },
        { time: '00:15', value: 61 },
        { time: '00:30', value: 65 },
        { time: '00:45', value: 69 },
        { time: '01:00', value: 67 }
      ]
    },
    network: {
      title: 'Network I/O Over Time',
      unit: 'Mbps',
      current: 156,
      average: 142,
      peak: 189,
      trend: 'decreasing',
      data: [
        { time: '00:00', value: 165 },
        { time: '00:15', value: 158 },
        { time: '00:30', value: 142 },
        { time: '00:45', value: 138 },
        { time: '01:00', value: 156 }
      ]
    },
    disk: {
      title: 'Disk I/O Over Time',
      unit: 'MB/s',
      current: 45,
      average: 38,
      peak: 67,
      trend: 'stable',
      data: [
        { time: '00:00', value: 42 },
        { time: '00:15', value: 38 },
        { time: '00:30', value: 35 },
        { time: '00:45', value: 41 },
        { time: '01:00', value: 45 }
      ]
    }
  };

  const currentData = performanceData[selectedChart];

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'text-error';
      case 'decreasing':
        return 'text-success';
      case 'stable':
        return 'text-secondary-500';
      default:
        return 'text-secondary-500';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <h2 className="text-lg font-semibold text-text-primary">Performance Charts</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {chartOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedChart(option.value)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                  ${selectedChart === option.value
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                  }
                `}
              >
                <Icon name={option.icon} size={16} />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-smooth">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        {/* Chart Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">{currentData.title}</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Current:</span>
                <span className="text-lg font-semibold text-text-primary">
                  {currentData.current}{currentData.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Average:</span>
                <span className="text-sm font-medium text-text-primary">
                  {currentData.average}{currentData.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Peak:</span>
                <span className="text-sm font-medium text-text-primary">
                  {currentData.peak}{currentData.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getTrendIcon(currentData.trend)} 
                  size={16} 
                  className={getTrendColor(currentData.trend)} 
                />
                <span className={`text-sm font-medium ${getTrendColor(currentData.trend)}`}>
                  {currentData.trend.charAt(0).toUpperCase() + currentData.trend.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-100 rounded-lg transition-smooth">
              <Icon name="ZoomIn" size={16} />
              <span>Zoom</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-100 rounded-lg transition-smooth">
              <Icon name="Maximize2" size={16} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80 bg-secondary-50 rounded-lg flex items-center justify-center mb-6">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="text-secondary-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">Interactive Performance Chart</h4>
            <p className="text-sm text-text-secondary max-w-md">
              Real-time {currentData.title.toLowerCase()} with zoom capabilities and time range selection.
              Chart would display actual performance data with interactive features.
            </p>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showAverage"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                defaultChecked
              />
              <label htmlFor="showAverage" className="text-sm text-text-secondary">
                Show Average Line
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showThreshold"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                defaultChecked
              />
              <label htmlFor="showThreshold" className="text-sm text-text-secondary">
                Show Threshold
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-text-secondary">Time Range:</span>
            <select className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="15m">Last 15 minutes</option>
              <option value="1h">Last hour</option>
              <option value="6h">Last 6 hours</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Multiple Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartOptions.filter(option => option.value !== selectedChart).slice(0, 2).map((option) => {
          const data = performanceData[option.value];
          return (
            <div key={option.value} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={option.icon} size={16} className="text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{option.label}</h4>
                    <p className="text-sm text-text-secondary">
                      Current: {data.current}{data.unit}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedChart(option.value)}
                  className="text-sm text-primary hover:text-primary-700 transition-smooth"
                >
                  View Details
                </button>
              </div>

              <div className="h-32 bg-secondary-50 rounded flex items-center justify-center">
                <div className="text-center">
                  <Icon name="BarChart3" size={24} className="text-secondary-400 mx-auto mb-1" />
                  <span className="text-xs text-text-secondary">Mini Chart</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-text-secondary">
                <span>Avg: {data.average}{data.unit}</span>
                <span>Peak: {data.peak}{data.unit}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(data.trend)} 
                    size={12} 
                    className={getTrendColor(data.trend)} 
                  />
                  <span className={getTrendColor(data.trend)}>
                    {data.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceCharts;