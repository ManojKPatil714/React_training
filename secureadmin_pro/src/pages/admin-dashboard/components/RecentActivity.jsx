import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const recentActivities = [
    {
      id: 1,
      type: "user_login",
      user: "Michael Rodriguez",
      action: "Logged in successfully",
      timestamp: new Date(Date.now() - 300000),
      status: "success",
      details: "IP: 192.168.1.45"
    },
    {
      id: 2,
      type: "security_alert",
      user: "System",
      action: "Failed login attempts detected",
      timestamp: new Date(Date.now() - 600000),
      status: "warning",
      details: "5 attempts from IP: 203.45.67.89"
    },
    {
      id: 3,
      type: "user_created",
      user: "Sarah Johnson",
      action: "Created new user account",
      timestamp: new Date(Date.now() - 900000),
      status: "success",
      details: "User: jennifer.smith@company.com"
    },
    {
      id: 4,
      type: "system_update",
      user: "System",
      action: "Security patch applied",
      timestamp: new Date(Date.now() - 1200000),
      status: "info",
      details: "Version 2.4.1 deployed"
    },
    {
      id: 5,
      type: "permission_change",
      user: "David Chen",
      action: "Updated user permissions",
      timestamp: new Date(Date.now() - 1800000),
      status: "info",
      details: "Modified role for alex.thompson"
    },
    {
      id: 6,
      type: "backup_completed",
      user: "System",
      action: "Database backup completed",
      timestamp: new Date(Date.now() - 2400000),
      status: "success",
      details: "Size: 2.3GB, Duration: 45s"
    }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      user_login: 'LogIn',
      security_alert: 'AlertTriangle',
      user_created: 'UserPlus',
      system_update: 'Download',
      permission_change: 'Settings',
      backup_completed: 'Database'
    };
    return iconMap[type] || 'Activity';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      success: 'text-success bg-success-50',
      warning: 'text-warning bg-warning-50',
      error: 'text-error bg-error-50',
      info: 'text-primary bg-primary-50'
    };
    return colorMap[status] || colorMap.info;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
            View All
          </button>
        </div>
        <p className="text-sm text-text-secondary mt-1">Latest system and user activities</p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`p-4 hover:bg-secondary-50 transition-smooth ${
              index !== recentActivities.length - 1 ? 'border-b border-border-light' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {activity.action}
                  </p>
                  <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-xs text-text-secondary mb-1">
                  by {activity.user}
                </p>
                
                {activity.details && (
                  <p className="text-xs text-secondary-500 bg-secondary-50 px-2 py-1 rounded">
                    {activity.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-secondary-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Showing {recentActivities.length} recent activities
          </span>
          <button className="text-primary hover:text-primary-700 font-medium transition-smooth flex items-center space-x-1">
            <span>Export Log</span>
            <Icon name="Download" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;