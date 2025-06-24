import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserDetailsModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'activity', label: 'Activity', icon: 'Activity' }
  ];

  const mockActivityLog = [
    {
      id: 1,
      action: 'Login',
      timestamp: new Date(Date.now() - 3600000),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'Success'
    },
    {
      id: 2,
      action: 'Password Change',
      timestamp: new Date(Date.now() - 86400000 * 2),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'Success'
    },
    {
      id: 3,
      action: 'Failed Login',
      timestamp: new Date(Date.now() - 86400000 * 5),
      ip: '192.168.1.105',
      device: 'Firefox on Mac',
      status: 'Failed'
    }
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success-50';
      case 'Inactive': return 'text-secondary bg-secondary-100';
      case 'Locked': return 'text-error bg-error-50';
      default: return 'text-secondary bg-secondary-100';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator': return 'text-primary bg-primary-50';
      case 'Manager': return 'text-accent bg-accent-50';
      case 'User': return 'text-secondary bg-secondary-100';
      default: return 'text-secondary bg-secondary-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1000 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary-100">
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
              <p className="text-text-secondary">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-500 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth
                  ${activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Full Name</label>
                      <p className="text-text-primary">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Email Address</label>
                      <p className="text-text-primary">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Department</label>
                      <p className="text-text-primary">{user.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Join Date</label>
                      <p className="text-text-primary">{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary">Account Status</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Current Status</label>
                      <p className="text-text-primary">{user.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Last Login</label>
                      <p className="text-text-primary">{formatDate(user.lastLogin)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Session Count</label>
                      <p className="text-text-primary">{user.sessionCount} sessions</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Failed Login Attempts</label>
                      <p className={`${user.failedLogins > 0 ? 'text-error' : 'text-success'}`}>
                        {user.failedLogins} attempts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-smooth flex items-center space-x-2">
                  <Icon name="Edit" size={16} />
                  <span>Edit Profile</span>
                </button>
                <button className="bg-warning text-white px-4 py-2 rounded-lg hover:bg-warning-700 transition-smooth flex items-center space-x-2">
                  <Icon name="Key" size={16} />
                  <span>Reset Password</span>
                </button>
                {user.status === 'Active' ? (
                  <button className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error-700 transition-smooth flex items-center space-x-2">
                    <Icon name="UserX" size={16} />
                    <span>Deactivate</span>
                  </button>
                ) : (
                  <button className="bg-success text-white px-4 py-2 rounded-lg hover:bg-success-700 transition-smooth flex items-center space-x-2">
                    <Icon name="UserCheck" size={16} />
                    <span>Activate</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Role & Permissions</h3>
                <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Current Role: {user.role}</p>
                      <p className="text-sm text-text-secondary">This role determines the user's access level and permissions</p>
                    </div>
                    <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-smooth">
                      Change Role
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">Assigned Permissions</h4>
                <div className="space-y-2">
                  {user.permissions.map((permission) => (
                    <div key={permission} className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-text-primary capitalize">{permission.replace('_', ' ')}</span>
                      </div>
                      <button className="text-error hover:text-error-700 transition-smooth">
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">Available Permissions</h4>
                <div className="space-y-2">
                  {['financial_reports', 'system_backup', 'user_export'].map((permission) => (
                    <div key={permission} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Plus" size={16} className="text-secondary-500" />
                        <span className="text-text-primary capitalize">{permission.replace('_', ' ')}</span>
                      </div>
                      <button className="text-primary hover:text-primary-700 transition-smooth">
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {mockActivityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${activity.status === 'Success' ? 'bg-success-100' : 'bg-error-100'}
                      `}>
                        <Icon 
                          name={activity.status === 'Success' ? 'Check' : 'X'} 
                          size={16} 
                          className={activity.status === 'Success' ? 'text-success' : 'text-error'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-text-primary">{activity.action}</p>
                          <span className="text-sm text-text-secondary">{formatDate(activity.timestamp)}</span>
                        </div>
                        <div className="text-sm text-text-secondary mt-1">
                          <p>IP: {activity.ip}</p>
                          <p>Device: {activity.device}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button className="bg-secondary-100 text-text-primary px-4 py-2 rounded-lg hover:bg-secondary-200 transition-smooth flex items-center space-x-2">
                  <Icon name="Download" size={16} />
                  <span>Export Activity Log</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;