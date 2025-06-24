import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AuditConfiguration = ({ onChangeDetected, onSaved }) => {
  const [auditConfig, setAuditConfig] = useState({
    enabled: true,
    logLevel: 'detailed',
    retentionPeriod: 90,
    realTimeAlerts: true,
    exportEnabled: true,
    encryptLogs: true,
    logCategories: {
      authentication: true,
      authorization: true,
      dataAccess: true,
      systemChanges: true,
      userActions: true,
      securityEvents: true,
      apiCalls: false,
      fileOperations: true
    },
    alertThresholds: {
      failedLogins: 10,
      suspiciousActivity: 5,
      dataExfiltration: 3,
      privilegeEscalation: 1
    },
    complianceStandards: {
      sox: true,
      hipaa: false,
      gdpr: true,
      pci: false
    }
  });

  const [recentAuditEvents] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      event: 'User Login',
      user: 'admin@company.com',
      ip: '192.168.1.100',
      status: 'Success',
      severity: 'Info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:28:15',
      event: 'Password Change',
      user: 'user@company.com',
      ip: '192.168.1.101',
      status: 'Success',
      severity: 'Medium'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:25:10',
      event: 'Failed Login Attempt',
      user: 'unknown@domain.com',
      ip: '203.0.113.50',
      status: 'Failed',
      severity: 'High'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:20:05',
      event: 'Data Export',
      user: 'manager@company.com',
      ip: '192.168.1.102',
      status: 'Success',
      severity: 'Medium'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:15:30',
      event: 'System Configuration Change',
      user: 'admin@company.com',
      ip: '192.168.1.100',
      status: 'Success',
      severity: 'High'
    }
  ]);

  const handleConfigChange = (key, value) => {
    setAuditConfig(prev => ({
      ...prev,
      [key]: value
    }));
    onChangeDetected();
  };

  const handleCategoryChange = (category, enabled) => {
    setAuditConfig(prev => ({
      ...prev,
      logCategories: {
        ...prev.logCategories,
        [category]: enabled
      }
    }));
    onChangeDetected();
  };

  const handleThresholdChange = (threshold, value) => {
    setAuditConfig(prev => ({
      ...prev,
      alertThresholds: {
        ...prev.alertThresholds,
        [threshold]: value
      }
    }));
    onChangeDetected();
  };

  const handleComplianceChange = (standard, enabled) => {
    setAuditConfig(prev => ({
      ...prev,
      complianceStandards: {
        ...prev.complianceStandards,
        [standard]: enabled
      }
    }));
    onChangeDetected();
  };

  const handleSave = () => {
    console.log('Saving audit configuration:', auditConfig);
    onSaved();
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-secondary-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'text-success';
      case 'failed': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-secondary-500';
    }
  };

  const logCategories = [
    { key: 'authentication', label: 'Authentication Events', description: 'Login/logout activities' },
    { key: 'authorization', label: 'Authorization Events', description: 'Permission checks and access control' },
    { key: 'dataAccess', label: 'Data Access', description: 'Database queries and data retrieval' },
    { key: 'systemChanges', label: 'System Changes', description: 'Configuration and system modifications' },
    { key: 'userActions', label: 'User Actions', description: 'User-initiated activities' },
    { key: 'securityEvents', label: 'Security Events', description: 'Security-related incidents' },
    { key: 'apiCalls', label: 'API Calls', description: 'External API interactions' },
    { key: 'fileOperations', label: 'File Operations', description: 'File uploads, downloads, and modifications' }
  ];

  const complianceStandards = [
    { key: 'sox', label: 'SOX', description: 'Sarbanes-Oxley Act compliance' },
    { key: 'hipaa', label: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
    { key: 'gdpr', label: 'GDPR', description: 'General Data Protection Regulation' },
    { key: 'pci', label: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' }
  ];

  return (
    <div className="space-y-8">
      {/* Audit Status */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Audit Logging Status</h3>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${auditConfig.enabled ? 'bg-success' : 'bg-error'}`} />
              <span className="font-medium text-text-primary">
                Audit Logging is {auditConfig.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <button
              onClick={() => handleConfigChange('enabled', !auditConfig.enabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${auditConfig.enabled ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${auditConfig.enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {auditConfig.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15,247</div>
                <div className="text-text-secondary">Events Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">98.5%</div>
                <div className="text-text-secondary">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">23</div>
                <div className="text-text-secondary">Alerts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">2.3GB</div>
                <div className="text-text-secondary">Storage Used</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* General Settings */}
      {auditConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">General Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <label className="block text-sm font-medium text-text-primary mb-2">Log Level</label>
                <select
                  value={auditConfig.logLevel}
                  onChange={(e) => handleConfigChange('logLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="basic">Basic - Essential events only</option>
                  <option value="detailed">Detailed - Comprehensive logging</option>
                  <option value="verbose">Verbose - All system activities</option>
                </select>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Log Retention Period</div>
                    <div className="text-sm text-text-secondary">How long to keep audit logs</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-text-primary">{auditConfig.retentionPeriod}</span>
                    <span className="text-sm text-text-secondary ml-1">days</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="2555"
                  step="30"
                  value={auditConfig.retentionPeriod}
                  onChange={(e) => handleConfigChange('retentionPeriod', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>30 days</span>
                  <span>7 years</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Real-time Alerts</div>
                  <div className="text-sm text-text-secondary">Send immediate notifications for critical events</div>
                </div>
                <button
                  onClick={() => handleConfigChange('realTimeAlerts', !auditConfig.realTimeAlerts)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${auditConfig.realTimeAlerts ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${auditConfig.realTimeAlerts ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Export Enabled</div>
                  <div className="text-sm text-text-secondary">Allow audit log exports</div>
                </div>
                <button
                  onClick={() => handleConfigChange('exportEnabled', !auditConfig.exportEnabled)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${auditConfig.exportEnabled ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${auditConfig.exportEnabled ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">Encrypt Logs</div>
                  <div className="text-sm text-text-secondary">Encrypt audit logs at rest</div>
                </div>
                <button
                  onClick={() => handleConfigChange('encryptLogs', !auditConfig.encryptLogs)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${auditConfig.encryptLogs ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${auditConfig.encryptLogs ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Categories */}
      {auditConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Log Categories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logCategories.map((category) => (
              <div
                key={category.key}
                className={`
                  p-4 border rounded-lg transition-smooth
                  ${auditConfig.logCategories[category.key] 
                    ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:bg-secondary-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{category.label}</div>
                    <div className="text-sm text-text-secondary mt-1">{category.description}</div>
                  </div>
                  <button
                    onClick={() => handleCategoryChange(category.key, !auditConfig.logCategories[category.key])}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4
                      ${auditConfig.logCategories[category.key] ? 'bg-primary' : 'bg-secondary-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${auditConfig.logCategories[category.key] ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert Thresholds */}
      {auditConfig.enabled && auditConfig.realTimeAlerts && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Alert Thresholds</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Failed Logins</div>
                    <div className="text-sm text-text-secondary">Alert after this many failed attempts</div>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{auditConfig.alertThresholds.failedLogins}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={auditConfig.alertThresholds.failedLogins}
                  onChange={(e) => handleThresholdChange('failedLogins', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Suspicious Activity</div>
                    <div className="text-sm text-text-secondary">Alert threshold for suspicious patterns</div>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{auditConfig.alertThresholds.suspiciousActivity}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={auditConfig.alertThresholds.suspiciousActivity}
                  onChange={(e) => handleThresholdChange('suspiciousActivity', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Data Exfiltration</div>
                    <div className="text-sm text-text-secondary">Alert for unusual data access patterns</div>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{auditConfig.alertThresholds.dataExfiltration}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={auditConfig.alertThresholds.dataExfiltration}
                  onChange={(e) => handleThresholdChange('dataExfiltration', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Privilege Escalation</div>
                    <div className="text-sm text-text-secondary">Alert for unauthorized privilege changes</div>
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{auditConfig.alertThresholds.privilegeEscalation}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={auditConfig.alertThresholds.privilegeEscalation}
                  onChange={(e) => handleThresholdChange('privilegeEscalation', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Standards */}
      {auditConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Compliance Standards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceStandards.map((standard) => (
              <div
                key={standard.key}
                className={`
                  p-4 border rounded-lg transition-smooth
                  ${auditConfig.complianceStandards[standard.key] 
                    ? 'border-success-200 bg-success-50' :'border-border bg-surface hover:bg-secondary-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{standard.label}</div>
                    <div className="text-sm text-text-secondary mt-1">{standard.description}</div>
                  </div>
                  <button
                    onClick={() => handleComplianceChange(standard.key, !auditConfig.complianceStandards[standard.key])}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4
                      ${auditConfig.complianceStandards[standard.key] ? 'bg-success' : 'bg-secondary-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${auditConfig.complianceStandards[standard.key] ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Audit Events */}
      {auditConfig.enabled && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Recent Audit Events</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
              <Icon name="Eye" size={16} />
              <span>View All Logs</span>
            </button>
          </div>

          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentAuditEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-secondary-50 transition-smooth">
                      <td className="px-6 py-4 text-sm text-text-primary font-mono">
                        {event.timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">
                        {event.event}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">
                        {event.user}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                        {event.ip}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="Download" size={16} />
            <span>Export Logs</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="Trash2" size={16} />
            <span>Clear Old Logs</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
          >
            <Icon name="Save" size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditConfiguration;