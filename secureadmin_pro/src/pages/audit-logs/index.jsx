import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';
import AuditTable from './components/AuditTable';
import FilterPanel from './components/FilterPanel';
import ComplianceDashboard from './components/ComplianceDashboard';
import ExportModal from './components/ExportModal';

const AuditLogs = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    users: [],
    actions: [],
    resources: [],
    status: [],
    riskLevel: [],
    searchQuery: ''
  });
  const [viewMode, setViewMode] = useState('table'); // table, timeline, dashboard

  // Mock audit log data
  const auditLogs = [
    {
      id: 'audit_001',
      timestamp: new Date('2024-01-15T10:30:00Z'),
      user: {
        id: 'user_001',
        name: 'John Smith',
        email: 'john.smith@company.com',
        role: 'Administrator'
      },
      action: 'USER_LOGIN',
      resource: 'Authentication System',
      resourceId: 'auth_001',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'SUCCESS',
      riskLevel: 'LOW',
      details: {
        sessionId: 'sess_12345',
        location: 'New York, NY',
        device: 'Desktop - Windows',
        mfaUsed: true,
        loginMethod: 'Password + MFA'
      },
      metadata: {
        requestId: 'req_001',
        duration: 245,
        responseCode: 200
      }
    },
    {
      id: 'audit_002',
      timestamp: new Date('2024-01-15T10:25:00Z'),
      user: {
        id: 'user_002',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Security Officer'
      },
      action: 'PERMISSION_CHANGE',
      resource: 'User Management',
      resourceId: 'user_003',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'SUCCESS',
      riskLevel: 'MEDIUM',
      details: {
        targetUser: 'Mike Wilson',
        permissionsBefore: ['READ', 'WRITE'],
        permissionsAfter: ['READ', 'WRITE', 'DELETE'],
        reason: 'Role promotion to Senior Developer'
      },
      metadata: {
        requestId: 'req_002',
        duration: 1200,
        responseCode: 200
      }
    },
    {
      id: 'audit_003',
      timestamp: new Date('2024-01-15T10:20:00Z'),
      user: {
        id: 'user_004',
        name: 'Unknown User',
        email: 'unknown@suspicious.com',
        role: 'Unknown'
      },
      action: 'LOGIN_FAILED',
      resource: 'Authentication System',
      resourceId: 'auth_001',
      ipAddress: '45.123.45.67',
      userAgent: 'curl/7.68.0',
      status: 'FAILED',
      riskLevel: 'HIGH',
      details: {
        failureReason: 'Invalid credentials',
        attemptCount: 5,
        accountLocked: true,
        suspiciousActivity: true,
        location: 'Unknown Location'
      },
      metadata: {
        requestId: 'req_003',
        duration: 50,
        responseCode: 401
      }
    },
    {
      id: 'audit_004',
      timestamp: new Date('2024-01-15T10:15:00Z'),
      user: {
        id: 'user_005',
        name: 'David Chen',
        email: 'david.chen@company.com',
        role: 'Developer'
      },
      action: 'DATA_EXPORT',
      resource: 'Customer Database',
      resourceId: 'db_customers',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      status: 'SUCCESS',
      riskLevel: 'MEDIUM',
      details: {
        exportType: 'CSV',
        recordCount: 1500,
        dataTypes: ['Personal Information', 'Contact Details'],
        approvalRequired: true,
        approvedBy: 'Sarah Johnson'
      },
      metadata: {
        requestId: 'req_004',
        duration: 3400,
        responseCode: 200
      }
    },
    {
      id: 'audit_005',
      timestamp: new Date('2024-01-15T10:10:00Z'),
      user: {
        id: 'system',
        name: 'System Process',
        email: 'system@company.com',
        role: 'System'
      },
      action: 'BACKUP_COMPLETED',
      resource: 'Database Backup',
      resourceId: 'backup_daily',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0',
      status: 'SUCCESS',
      riskLevel: 'LOW',
      details: {
        backupSize: '2.4 GB',
        backupLocation: '/backups/daily/2024-01-15',
        compressionRatio: '65%',
        verificationStatus: 'Passed'
      },
      metadata: {
        requestId: 'req_005',
        duration: 45000,
        responseCode: 200
      }
    }
  ];

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      // Date range filter
      if (filters.dateRange.start && log.timestamp < new Date(filters.dateRange.start)) return false;
      if (filters.dateRange.end && log.timestamp > new Date(filters.dateRange.end)) return false;
      
      // User filter
      if (filters.users.length > 0 && !filters.users.includes(log.user.id)) return false;
      
      // Action filter
      if (filters.actions.length > 0 && !filters.actions.includes(log.action)) return false;
      
      // Resource filter
      if (filters.resources.length > 0 && !filters.resources.includes(log.resource)) return false;
      
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(log.status)) return false;
      
      // Risk level filter
      if (filters.riskLevel.length > 0 && !filters.riskLevel.includes(log.riskLevel)) return false;
      
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          log.user.name.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          log.resource.toLowerCase().includes(query) ||
          log.ipAddress.includes(query)
        );
      }
      
      return true;
    });
  }, [auditLogs, filters]);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleExport = (format, options) => {
    console.log('Exporting logs:', { format, options, logs: selectedLogs.length > 0 ? selectedLogs : filteredLogs });
    setIsExportModalOpen(false);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'on logs:', selectedLogs);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        onSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        user={{ name: 'Admin User', role: 'System Administrator' }}
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
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <BreadcrumbNavigation />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Audit Logs</h1>
                <p className="text-text-secondary">
                  Comprehensive activity tracking and compliance reporting
                </p>
              </div>

              <div className="flex items-center space-x-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-secondary-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'dashboard' ?'bg-surface text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                    }`}
                  >
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'table' ?'bg-surface text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Table" size={16} className="mr-2" />
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'timeline' ?'bg-surface text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Clock" size={16} className="mr-2" />
                    Timeline
                  </button>
                </div>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="Download" size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard View */}
          {viewMode === 'dashboard' && (
            <ComplianceDashboard logs={filteredLogs} />
          )}

          {/* Filter Panel */}
          {(viewMode === 'table' || viewMode === 'timeline') && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              totalLogs={auditLogs.length}
              filteredLogs={filteredLogs.length}
            />
          )}

          {/* Bulk Actions */}
          {selectedLogs.length > 0 && (viewMode === 'table' || viewMode === 'timeline') && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckSquare" size={20} className="text-primary" />
                  <span className="font-medium text-primary">
                    {selectedLogs.length} log{selectedLogs.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-700 transition-smooth"
                  >
                    Export Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="px-3 py-1.5 text-sm bg-secondary-100 text-text-primary rounded hover:bg-secondary-200 transition-smooth"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => setSelectedLogs([])}
                    className="px-3 py-1.5 text-sm text-secondary-600 hover:text-text-primary transition-smooth"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audit Table/Timeline */}
          {(viewMode === 'table' || viewMode === 'timeline') && (
            <AuditTable
              logs={filteredLogs}
              selectedLogs={selectedLogs}
              onSelectionChange={setSelectedLogs}
              viewMode={viewMode}
            />
          )}
        </div>
      </main>

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
          totalLogs={selectedLogs.length > 0 ? selectedLogs.length : filteredLogs.length}
        />
      )}
    </div>
  );
};

export default AuditLogs;