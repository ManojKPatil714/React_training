import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalHeader = ({ onSidebarToggle, user, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Security Alert', message: 'Failed login attempts detected', type: 'warning', time: '5 min ago' },
    { id: 2, title: 'System Update', message: 'Maintenance scheduled for tonight', type: 'info', time: '1 hour ago' },
    { id: 3, title: 'User Registration', message: 'New user account created', type: 'success', time: '2 hours ago' },
  ];

  const unreadCount = notifications.length;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login-screen');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    setIsNotificationOpen(false);
  };

  const isLoginPage = location.pathname === '/login-screen';

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} className="text-secondary-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">SecureAdmin</h1>
              <p className="text-xs text-text-secondary -mt-1">Enterprise Security Platform</p>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Command Palette Trigger */}
          <button
            className="hidden md:flex items-center space-x-2 px-3 py-2 bg-secondary-50 border border-border rounded-lg hover:bg-secondary-100 transition-smooth"
            onClick={() => console.log('Command palette opened')}
          >
            <Icon name="Search" size={16} className="text-secondary-500" />
            <span className="text-sm text-secondary-600">Search...</span>
            <div className="flex items-center space-x-1 text-xs text-secondary-400">
              <kbd className="px-1.5 py-0.5 bg-secondary-200 rounded">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-secondary-200 rounded">K</kbd>
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} className="text-secondary-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-lg shadow-elevation z-200">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-text-primary">Notifications</h3>
                  <p className="text-sm text-text-secondary">{unreadCount} unread</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className="p-4 border-b border-border-light hover:bg-secondary-50 cursor-pointer transition-smooth"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'warning' ? 'bg-warning' :
                          notification.type === 'success' ? 'bg-success' : 'bg-primary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-text-primary">{notification.title}</p>
                          <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                          <p className="text-xs text-secondary-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-700" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-text-secondary">{user?.role || 'System Administrator'}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-secondary-500" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-lg shadow-elevation z-200">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-text-primary">{user?.name || 'Admin User'}</p>
                  <p className="text-sm text-text-secondary">{user?.email || 'admin@company.com'}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      console.log('Profile clicked');
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                  >
                    <Icon name="User" size={16} className="text-secondary-500" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      console.log('Preferences clicked');
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                  >
                    <Icon name="Settings" size={16} className="text-secondary-500" />
                    <span>Preferences</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      console.log('Help clicked');
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-smooth"
                  >
                    <Icon name="HelpCircle" size={16} className="text-secondary-500" />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="text-error" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-4">
        <button
          className="w-full flex items-center space-x-2 px-3 py-2 bg-secondary-50 border border-border rounded-lg"
          onClick={() => console.log('Mobile search opened')}
        >
          <Icon name="Search" size={16} className="text-secondary-500" />
          <span className="text-sm text-secondary-600">Search...</span>
        </button>
      </div>

      {/* Overlay for mobile menus */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-90"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default GlobalHeader;