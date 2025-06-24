import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';
import SystemMetricsGrid from './components/SystemMetricsGrid';
import ApplicationMonitoring from './components/ApplicationMonitoring';
import AlertManagement from './components/AlertManagement';
import PerformanceCharts from './components/PerformanceCharts';

const SystemMonitoring = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const user = {
    name: "System Administrator",
    email: "admin@secureadmin.com",
    role: "System Administrator"
  };

  const timeRanges = [
    { value: '15m', label: '15 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' }
  ];

  const refreshIntervals = [
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  useEffect(() => {
    let interval;
    if (isAutoRefresh) {
      interval = setInterval(() => {
        setLastUpdated(new Date());
      }, refreshInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval]);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleExportReport = () => {
    console.log('Exporting performance report...');
    // Mock export functionality
    const reportData = {
      timestamp: new Date().toISOString(),
      timeRange: selectedTimeRange,
      metrics: 'System performance data would be exported here'
    };
    console.log('Report data:', reportData);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        onSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        user={user}
        onLogout={handleLogout}
      />

      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className={`
        pt-16 transition-all duration-300 ease-out min-h-screen
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbNavigation />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">System Monitoring</h1>
                <p className="text-text-secondary">
                  Real-time performance insights and health metrics
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
                {/* Time Range Selector */}
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-secondary-500" />
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {timeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Auto Refresh Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoRefresh"
                      checked={isAutoRefresh}
                      onChange={(e) => setIsAutoRefresh(e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                    <label htmlFor="autoRefresh" className="text-sm text-text-secondary">
                      Auto-refresh
                    </label>
                  </div>

                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    disabled={!isAutoRefresh}
                    className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                  >
                    {refreshIntervals.map((interval) => (
                      <option key={interval.value} value={interval.value}>
                        {interval.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-smooth"
                  >
                    <Icon name="RotateCcw" size={16} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={handleExportReport}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                  >
                    <Icon name="Download" size={16} />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="flex items-center space-x-2 mt-4 text-sm text-text-secondary">
              <Icon name="RefreshCw" size={14} />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              {isAutoRefresh && (
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>Live</span>
                </span>
              )}
            </div>
          </div>

          {/* System Metrics Grid */}
          <div className="mb-8">
            <SystemMetricsGrid timeRange={selectedTimeRange} />
          </div>

          {/* Performance Charts */}
          <div className="mb-8">
            <PerformanceCharts timeRange={selectedTimeRange} />
          </div>

          {/* Application Monitoring */}
          <div className="mb-8">
            <ApplicationMonitoring timeRange={selectedTimeRange} />
          </div>

          {/* Alert Management */}
          <div className="mb-8">
            <AlertManagement />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemMonitoring;