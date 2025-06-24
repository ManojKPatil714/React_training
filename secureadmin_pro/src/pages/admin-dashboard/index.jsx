import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';
import MetricCard from './components/MetricCard';
import RecentActivity from './components/RecentActivity';
import SystemMonitoringChart from './components/SystemMonitoringChart';
import PendingTasks from './components/PendingTasks';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock user data
  const currentUser = {
    name: "Sarah Johnson",
    email: "sarah.johnson@secureadmin.com",
    role: "System Administrator"
  };

  // Mock dashboard metrics
  const dashboardMetrics = [
    {
      id: 1,
      title: "Active Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: "Users",
      color: "primary",
      description: "Currently online users"
    },
    {
      id: 2,
      title: "System Health",
      value: "98.2%",
      change: "+0.3%",
      trend: "up",
      icon: "Activity",
      color: "success",
      description: "Overall system uptime"
    },
    {
      id: 3,
      title: "Recent Alerts",
      value: "7",
      change: "-23%",
      trend: "down",
      icon: "AlertTriangle",
      color: "warning",
      description: "Alerts in last 24h"
    },
    {
      id: 4,
      title: "Performance Score",
      value: "94.8",
      change: "+2.1%",
      trend: "up",
      icon: "Zap",
      color: "accent",
      description: "Average response time"
    }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'users': navigate('/user-management');
        break;
      case 'security': navigate('/security-settings');
        break;
      case 'monitoring': navigate('/system-monitoring');
        break;
      case 'logs': navigate('/audit-logs');
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        onSidebarToggle={handleMobileSidebarToggle}
        user={currentUser}
        onLogout={handleLogout}
      />

      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      {/* Main Content */}
      <main
        className={`
          pt-16 transition-all duration-300 ease-out min-h-screen
          ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
        `}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
                <p className="text-text-secondary">Welcome back, {currentUser.name}. Here's what's happening with your system today.</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-sm text-text-secondary">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </div>
                <button
                  onClick={() => setLastRefresh(new Date())}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
            
            <BreadcrumbNavigation />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                onClick={() => handleQuickAction(metric.id === 1 ? 'users' : metric.id === 2 ? 'monitoring' : 'logs')}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Activity - Left Column */}
            <div className="lg:col-span-4">
              <RecentActivity />
            </div>

            {/* System Monitoring Charts - Center Column */}
            <div className="lg:col-span-5">
              <SystemMonitoringChart />
            </div>

            {/* Pending Tasks - Right Column */}
            <div className="lg:col-span-3">
              <PendingTasks onQuickAction={handleQuickAction} />
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => handleQuickAction('users')}
                  className="flex flex-col items-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-smooth group"
                >
                  <Icon name="Users" size={24} className="text-primary-700 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-primary-700">Manage Users</span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('security')}
                  className="flex flex-col items-center p-4 bg-accent-50 hover:bg-accent-100 rounded-lg transition-smooth group"
                >
                  <Icon name="Shield" size={24} className="text-accent-700 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-accent-700">Security Settings</span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('monitoring')}
                  className="flex flex-col items-center p-4 bg-warning-50 hover:bg-warning-100 rounded-lg transition-smooth group"
                >
                  <Icon name="Activity" size={24} className="text-warning-700 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-warning-700">System Monitor</span>
                </button>
                
                <button
                  onClick={() => handleQuickAction('logs')}
                  className="flex flex-col items-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-smooth group"
                >
                  <Icon name="FileText" size={24} className="text-secondary-700 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-secondary-700">Audit Logs</span>
                </button>
              </div>
            </div>
          </div>

          {/* System Status Footer */}
          <div className="mt-8 bg-surface border border-border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-text-primary">All Systems Operational</span>
                </div>
                <div className="text-sm text-text-secondary">
                  Server: US-East-1 | Version: 2.4.1
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Database" size={14} />
                  <span>DB: 45ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Wifi" size={14} />
                  <span>API: 23ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="HardDrive" size={14} />
                  <span>Storage: 67%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;