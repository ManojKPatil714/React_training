import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      description: 'System overview and metrics'
    },
    {
      label: 'User Management',
      path: '/user-management',
      icon: 'Users',
      badge: 3,
      description: 'Manage user accounts and permissions'
    },
    {
      label: 'Security Settings',
      path: '/security-settings',
      icon: 'Shield',
      badge: null,
      description: 'Configure security policies'
    },
    {
      label: 'System Monitoring',
      path: '/system-monitoring',
      icon: 'Activity',
      badge: 2,
      description: 'Real-time system performance'
    },
    {
      label: 'Audit Logs',
      path: '/audit-logs',
      icon: 'FileText',
      badge: null,
      description: 'Security and compliance logs'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobileOpen) {
      onMobileClose();
    }
  };

  const isLoginPage = location.pathname === '/login-screen';

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-1000 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border z-1000 lg:z-90
          transition-all duration-300 ease-out
          ${isCollapsed ? 'w-16' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={16} className="text-primary-700" />
                </div>
                <div>
                  <h2 className="font-semibold text-text-primary">Admin Panel</h2>
                  <p className="text-xs text-text-secondary">System Management</p>
                </div>
              </div>
            )}
            
            <button
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={16} 
                className="text-secondary-600" 
              />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className="relative flex items-center">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={isActive ? 'text-primary-700' : 'text-secondary-500'} 
                    />
                    {item.badge && (
                      <span className={`
                        absolute -top-2 -right-2 w-5 h-5 bg-error text-white text-xs rounded-full 
                        flex items-center justify-center font-medium
                        ${isCollapsed ? 'scale-75' : ''}
                      `}>
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-secondary-400 mt-0.5">{item.description}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="bg-secondary-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-text-primary">System Status</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">CPU Usage</span>
                    <span className="text-success font-medium">23%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Memory</span>
                    <span className="text-warning font-medium">67%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Storage</span>
                    <span className="text-success font-medium">45%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-success" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;