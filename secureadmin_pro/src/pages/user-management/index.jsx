import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import UserDetailsModal from './components/UserDetailsModal';
import AddUserModal from './components/AddUserModal';
import BulkActionsModal from './components/BulkActionsModal';

const UserManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    department: 'all',
    dateRange: 'all'
  });
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Administrator",
      status: "Active",
      department: "IT",
      lastLogin: new Date(Date.now() - 3600000),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2023, 0, 15),
      permissions: ["user_management", "system_config", "audit_logs"],
      sessionCount: 45,
      failedLogins: 0,
      accountLocked: false
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Manager",
      status: "Active",
      department: "Sales",
      lastLogin: new Date(Date.now() - 7200000),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2022, 5, 20),
      permissions: ["team_management", "reports"],
      sessionCount: 32,
      failedLogins: 1,
      accountLocked: false
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "User",
      status: "Inactive",
      department: "Marketing",
      lastLogin: new Date(Date.now() - 86400000 * 7),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2023, 2, 10),
      permissions: ["basic_access"],
      sessionCount: 18,
      failedLogins: 0,
      accountLocked: false
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@company.com",
      role: "Administrator",
      status: "Active",
      department: "IT",
      lastLogin: new Date(Date.now() - 1800000),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2021, 8, 5),
      permissions: ["user_management", "system_config", "audit_logs", "security_settings"],
      sessionCount: 67,
      failedLogins: 0,
      accountLocked: false
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "Manager",
      status: "Locked",
      department: "Finance",
      lastLogin: new Date(Date.now() - 86400000 * 3),
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2022, 11, 12),
      permissions: ["team_management", "financial_reports"],
      sessionCount: 28,
      failedLogins: 5,
      accountLocked: true
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@company.com",
      role: "User",
      status: "Active",
      department: "HR",
      lastLogin: new Date(Date.now() - 14400000),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      joinDate: new Date(2023, 4, 8),
      permissions: ["basic_access", "hr_tools"],
      sessionCount: 22,
      failedLogins: 0,
      accountLocked: false
    }
  ];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || user.status === filters.status;
      const matchesDepartment = filters.department === 'all' || user.department === filters.department;
      
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'lastLogin') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [mockUsers, searchQuery, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const userStats = useMemo(() => {
    const total = mockUsers.length;
    const active = mockUsers.filter(u => u.status === 'Active').length;
    const inactive = mockUsers.filter(u => u.status === 'Inactive').length;
    const locked = mockUsers.filter(u => u.status === 'Locked').length;
    const admins = mockUsers.filter(u => u.role === 'Administrator').length;
    const managers = mockUsers.filter(u => u.role === 'Manager').length;
    const users = mockUsers.filter(u => u.role === 'User').length;

    return { total, active, inactive, locked, admins, managers, users };
  }, [mockUsers]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === paginatedUsers.length 
        ? [] 
        : paginatedUsers.map(user => user.id)
    );
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
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
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbNavigation />
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
                <p className="text-text-secondary mt-1">Manage user accounts, roles, and permissions</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-smooth flex items-center space-x-2"
              >
                <Icon name="UserPlus" size={20} />
                <span>Add User</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filters and Search */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
                      <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={filters.role}
                      onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                      className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Locked">Locked</option>
                    </select>
                    <select
                      value={filters.department}
                      onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                      className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Departments</option>
                      <option value="IT">IT</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {(filters.role !== 'all' || filters.status !== 'all' || filters.department !== 'all' || searchQuery) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {searchQuery && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-50 text-primary-700">
                        Search: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-2 hover:text-primary-900"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                    {filters.role !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-50 text-accent-700">
                        Role: {filters.role}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, role: 'all' }))}
                          className="ml-2 hover:text-accent-900"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                    {filters.status !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700">
                        Status: {filters.status}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
                          className="ml-2 hover:text-secondary-900"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                    {filters.department !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warning-50 text-warning-700">
                        Department: {filters.department}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, department: 'all' }))}
                          className="ml-2 hover:text-warning-900"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <span className="text-sm text-primary-700">
                      {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setShowBulkActions(true)}
                      className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-smooth"
                    >
                      Bulk Actions
                    </button>
                  </div>
                )}
              </div>

              {/* Users Table - Desktop */}
              <div className="hidden lg:block bg-surface rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-border focus:ring-primary-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('name')}
                            className="flex items-center space-x-1 hover:text-text-primary"
                          >
                            <span>User</span>
                            <Icon name="ArrowUpDown" size={14} />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('role')}
                            className="flex items-center space-x-1 hover:text-text-primary"
                          >
                            <span>Role</span>
                            <Icon name="ArrowUpDown" size={14} />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('status')}
                            className="flex items-center space-x-1 hover:text-text-primary"
                          >
                            <span>Status</span>
                            <Icon name="ArrowUpDown" size={14} />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('lastLogin')}
                            className="flex items-center space-x-1 hover:text-text-primary"
                          >
                            <span>Last Login</span>
                            <Icon name="ArrowUpDown" size={14} />
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-border">
                      {paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-secondary-50 cursor-pointer transition-smooth"
                          onClick={() => handleUserClick(user)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleUserSelect(user.id);
                              }}
                              className="rounded border-border focus:ring-primary-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100">
                                <Image
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-text-primary">{user.name}</div>
                                <div className="text-sm text-text-secondary">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {user.department}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {formatLastLogin(user.lastLogin)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUserClick(user);
                                }}
                                className="p-1 text-secondary-500 hover:text-primary transition-smooth"
                                title="View Details"
                              >
                                <Icon name="Eye" size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Edit user:', user.id);
                                }}
                                className="p-1 text-secondary-500 hover:text-accent transition-smooth"
                                title="Edit User"
                              >
                                <Icon name="Edit" size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Reset password:', user.id);
                                }}
                                className="p-1 text-secondary-500 hover:text-warning transition-smooth"
                                title="Reset Password"
                              >
                                <Icon name="Key" size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-3 border-t border-border flex items-center justify-between">
                    <div className="text-sm text-text-secondary">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-border rounded hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                      >
                        <Icon name="ChevronLeft" size={16} />
                      </button>
                      <span className="text-sm text-text-secondary">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-border rounded hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                      >
                        <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Users Cards - Mobile */}
              <div className="lg:hidden space-y-4">
                {paginatedUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:shadow-subtle transition-smooth"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleUserSelect(user.id);
                          }}
                          className="rounded border-border focus:ring-primary-500"
                        />
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{user.name}</div>
                          <div className="text-sm text-text-secondary">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit user:', user.id);
                          }}
                          className="p-2 text-secondary-500 hover:text-accent transition-smooth"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Reset password:', user.id);
                          }}
                          className="p-2 text-secondary-500 hover:text-warning transition-smooth"
                        >
                          <Icon name="Key" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Role:</span>
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Status:</span>
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Department:</span>
                        <span className="ml-2 text-text-primary">{user.department}</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Last Login:</span>
                        <span className="ml-2 text-text-primary">{formatLastLogin(user.lastLogin)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Panel */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">User Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Total Users</span>
                    <span className="font-semibold text-text-primary">{userStats.total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Active</span>
                    <span className="font-semibold text-success">{userStats.active}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Inactive</span>
                    <span className="font-semibold text-secondary">{userStats.inactive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Locked</span>
                    <span className="font-semibold text-error">{userStats.locked}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">Role Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Administrators</span>
                    <span className="font-semibold text-primary">{userStats.admins}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Managers</span>
                    <span className="font-semibold text-accent">{userStats.managers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Users</span>
                    <span className="font-semibold text-secondary">{userStats.users}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => console.log('Export users')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export Users</span>
                  </button>
                  <button
                    onClick={() => console.log('Import users')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
                  >
                    <Icon name="Upload" size={16} />
                    <span>Import Users</span>
                  </button>
                  <button
                    onClick={() => console.log('Generate report')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onUserAdded={(newUser) => {
            console.log('New user added:', newUser);
            setShowAddUser(false);
          }}
        />
      )}

      {showBulkActions && (
        <BulkActionsModal
          selectedUsers={selectedUsers}
          users={mockUsers.filter(user => selectedUsers.includes(user.id))}
          onClose={() => setShowBulkActions(false)}
          onActionComplete={() => {
            setShowBulkActions(false);
            setSelectedUsers([]);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;