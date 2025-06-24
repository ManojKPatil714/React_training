import React, { useState } from 'react';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';

// Components
import PasswordPolicies from './components/PasswordPolicies';
import MFASettings from './components/MFASettings';
import SessionManagement from './components/SessionManagement';
import AccessControls from './components/AccessControls';
import AuditConfiguration from './components/AuditConfiguration';

const SecuritySettings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('password-policies');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const user = {
    name: "Security Admin",
    email: "security@secureadmin.com",
    role: "Security Administrator"
  };

  const securityTabs = [
    {
      id: 'password-policies',
      label: 'Password Policies',
      icon: 'Lock',
      description: 'Configure password requirements and complexity rules',
      component: PasswordPolicies
    },
    {
      id: 'mfa-settings',
      label: 'MFA Settings',
      icon: 'Shield',
      description: 'Multi-factor authentication configuration',
      component: MFASettings
    },
    {
      id: 'session-management',
      label: 'Session Management',
      icon: 'Clock',
      description: 'Session timeout and security controls',
      component: SessionManagement
    },
    {
      id: 'access-controls',
      label: 'Access Controls',
      icon: 'UserCheck',
      description: 'IP restrictions and access policies',
      component: AccessControls
    },
    {
      id: 'audit-configuration',
      label: 'Audit Configuration',
      icon: 'FileText',
      description: 'Logging and compliance settings',
      component: AuditConfiguration
    }
  ];

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmChange = window.confirm('You have unsaved changes. Are you sure you want to switch tabs?');
      if (!confirmChange) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

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
    console.log('User logged out');
  };

  const activeTabData = securityTabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        onSidebarToggle={handleMobileSidebarToggle}
        user={user}
        onLogout={handleLogout}
      />

      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <main className={`
        pt-16 transition-all duration-300 ease-out min-h-screen
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbNavigation />
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Security Settings</h1>
                <p className="text-text-secondary mt-2">
                  Configure security policies and access controls for your organization
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 border border-success-200 rounded-lg">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success-700">Security Level: High</span>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
                  <Icon name="Download" size={16} />
                  <span className="hidden sm:inline">Export Config</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation Tabs - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-surface border border-border rounded-lg p-4 sticky top-24">
                <h3 className="font-semibold text-text-primary mb-4">Security Categories</h3>
                <nav className="space-y-2">
                  {securityTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`
                        w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-smooth
                        ${activeTab === tab.id 
                          ? 'bg-primary-50 text-primary-700 border border-primary-200' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                        }
                      `}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={20} 
                        className={activeTab === tab.id ? 'text-primary-700' : 'text-secondary-500'} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs text-secondary-400 mt-1">{tab.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Security Status */}
                <div className="mt-6 p-3 bg-secondary-50 rounded-lg">
                  <h4 className="font-medium text-text-primary mb-3">Security Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Password Policy</span>
                      <span className="text-success font-medium">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">MFA Enforcement</span>
                      <span className="text-success font-medium">Enabled</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Session Security</span>
                      <span className="text-warning font-medium">Medium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Audit Logging</span>
                      <span className="text-success font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden col-span-1">
              <div className="bg-surface border border-border rounded-lg p-4 mb-6">
                <select
                  value={activeTab}
                  onChange={(e) => handleTabChange(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary"
                >
                  {securityTabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-surface border border-border rounded-lg">
                {/* Tab Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name={activeTabData?.icon} size={20} className="text-primary-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">{activeTabData?.label}</h2>
                      <p className="text-text-secondary">{activeTabData?.description}</p>
                    </div>
                  </div>

                  {hasUnsavedChanges && (
                    <div className="mt-4 flex items-center space-x-2 px-3 py-2 bg-warning-50 border border-warning-200 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm text-warning-700">You have unsaved changes</span>
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {ActiveComponent && (
                    <ActiveComponent 
                      onChangeDetected={() => setHasUnsavedChanges(true)}
                      onSaved={() => setHasUnsavedChanges(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecuritySettings;