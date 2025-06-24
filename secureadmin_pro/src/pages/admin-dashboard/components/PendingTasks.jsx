import React from 'react';
import Icon from 'components/AppIcon';

const PendingTasks = ({ onQuickAction }) => {
  const pendingTasks = [
    {
      id: 1,
      title: "Review Security Alerts",
      description: "7 security alerts require immediate attention",
      priority: "high",
      action: "security",
      icon: "AlertTriangle",
      dueDate: "Today",
      category: "Security"
    },
    {
      id: 2,
      title: "User Access Review",
      description: "Monthly user permission audit due",
      priority: "medium",
      action: "users",
      icon: "Users",
      dueDate: "Tomorrow",
      category: "Compliance"
    },
    {
      id: 3,
      title: "System Backup Verification",
      description: "Verify last night\'s backup integrity",
      priority: "medium",
      action: "monitoring",
      icon: "Database",
      dueDate: "Today",
      category: "Maintenance"
    },
    {
      id: 4,
      title: "Update Security Policies",
      description: "Annual security policy review and update",
      priority: "low",
      action: "security",
      icon: "FileText",
      dueDate: "This Week",
      category: "Policy"
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Database query optimization needed",
      priority: "medium",
      action: "monitoring",
      icon: "Zap",
      dueDate: "Next Week",
      category: "Performance"
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: "Add New User",
      icon: "UserPlus",
      action: "users",
      color: "primary"
    },
    {
      id: 2,
      title: "Generate Report",
      icon: "BarChart3",
      action: "logs",
      color: "accent"
    },
    {
      id: 3,
      title: "System Health Check",
      icon: "Activity",
      action: "monitoring",
      color: "success"
    },
    {
      id: 4,
      title: "Security Scan",
      icon: "Shield",
      action: "security",
      color: "warning"
    }
  ];

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'bg-error-50 text-error-700 border-error-200',
      medium: 'bg-warning-50 text-warning-700 border-warning-200',
      low: 'bg-success-50 text-success-700 border-success-200'
    };
    return colorMap[priority] || colorMap.medium;
  };

  const getActionColor = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 hover:bg-primary-100 text-primary-700',
      accent: 'bg-accent-50 hover:bg-accent-100 text-accent-700',
      success: 'bg-success-50 hover:bg-success-100 text-success-700',
      warning: 'bg-warning-50 hover:bg-warning-100 text-warning-700'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Pending Tasks</h3>
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
              {pendingTasks.filter(task => task.priority === 'high').length}
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">Items requiring your attention</p>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {pendingTasks.map((task, index) => (
            <div
              key={task.id}
              className={`p-4 hover:bg-secondary-50 transition-smooth cursor-pointer ${
                index !== pendingTasks.length - 1 ? 'border-b border-border-light' : ''
              }`}
              onClick={() => onQuickAction(task.action)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={task.icon} size={16} className="text-secondary-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {task.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-2">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded">
                      {task.category}
                    </span>
                    <span className="text-xs text-text-secondary">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
          <p className="text-sm text-text-secondary mt-1">Common administrative tasks</p>
        </div>

        <div className="p-4 space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onQuickAction(action.action)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-smooth ${getActionColor(action.color)}`}
            >
              <Icon name={action.icon} size={18} />
              <span className="font-medium">{action.title}</span>
              <Icon name="ChevronRight" size={16} className="ml-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* System Status Summary */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">System Status</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-text-primary">Web Services</span>
              </div>
              <span className="text-xs text-success font-medium">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-text-primary">Database</span>
              </div>
              <span className="text-xs text-success font-medium">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-text-primary">Email Service</span>
              </div>
              <span className="text-xs text-warning font-medium">Degraded</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-text-primary">File Storage</span>
              </div>
              <span className="text-xs text-success font-medium">Operational</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => onQuickAction('monitoring')}
              className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-smooth flex items-center justify-center space-x-1"
            >
              <span>View Detailed Status</span>
              <Icon name="ExternalLink" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;