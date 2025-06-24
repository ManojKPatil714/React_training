import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, totalLogs, filteredLogs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Security Incidents', filters: { riskLevel: ['HIGH'], actions: ['LOGIN_FAILED'] } },
    { id: 2, name: 'Admin Actions', filters: { actions: ['PERMISSION_CHANGE', 'USER_CREATE', 'USER_DELETE'] } },
    { id: 3, name: 'Data Access', filters: { actions: ['DATA_EXPORT', 'DATA_VIEW'] } }
  ]);

  const actionTypes = [
    'USER_LOGIN', 'USER_LOGOUT', 'LOGIN_FAILED', 'PERMISSION_CHANGE', 
    'USER_CREATE', 'USER_DELETE', 'DATA_EXPORT', 'DATA_VIEW', 
    'BACKUP_COMPLETED', 'SYSTEM_UPDATE'
  ];

  const resourceTypes = [
    'Authentication System', 'User Management', 'Customer Database', 
    'Database Backup', 'Security Settings', 'System Configuration'
  ];

  const statusTypes = ['SUCCESS', 'FAILED', 'PENDING'];
  const riskLevels = ['LOW', 'MEDIUM', 'HIGH'];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectChange = (key, value, checked) => {
    const currentValues = filters[key] || [];
    if (checked) {
      handleFilterChange(key, [...currentValues, value]);
    } else {
      handleFilterChange(key, currentValues.filter(v => v !== value));
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: { start: '', end: '' },
      users: [],
      actions: [],
      resources: [],
      status: [],
      riskLevel: [],
      searchQuery: ''
    });
  };

  const applySavedFilter = (savedFilter) => {
    onFiltersChange({
      ...filters,
      ...savedFilter.filters
    });
  };

  const saveCurrentFilter = () => {
    const filterName = prompt('Enter a name for this filter:');
    if (filterName) {
      const newFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters }
      };
      setSavedFilters([...savedFilters, newFilter]);
    }
  };

  const hasActiveFilters = () => {
    return (
      filters.dateRange.start || 
      filters.dateRange.end || 
      filters.users.length > 0 || 
      filters.actions.length > 0 || 
      filters.resources.length > 0 || 
      filters.status.length > 0 || 
      filters.riskLevel.length > 0 || 
      filters.searchQuery
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-text-primary hover:text-primary transition-smooth"
          >
            <Icon name="Filter" size={20} />
            <span className="font-medium">Filters</span>
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
          
          <div className="text-sm text-text-secondary">
            Showing {filteredLogs} of {totalLogs} logs
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-error hover:text-error-700 transition-smooth"
            >
              Clear All
            </button>
          )}
          
          <button
            onClick={saveCurrentFilter}
            className="px-3 py-1.5 text-sm bg-secondary-100 text-text-primary rounded hover:bg-secondary-200 transition-smooth"
          >
            Save Filter
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" />
          <input
            type="text"
            placeholder="Search logs by user, action, resource, or IP address..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Saved Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Bookmark" size={16} className="text-secondary-500" />
          <span className="text-sm font-medium text-text-primary">Quick Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {savedFilters.map((savedFilter) => (
            <button
              key={savedFilter.id}
              onClick={() => applySavedFilter(savedFilter)}
              className="px-3 py-1.5 text-sm bg-primary-50 text-primary border border-primary-200 rounded-lg hover:bg-primary-100 transition-smooth"
            >
              {savedFilter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">From</label>
                <input
                  type="datetime-local"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">To</label>
                <input
                  type="datetime-local"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Action Types */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Actions</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {actionTypes.map((action) => (
                  <label key={action} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.actions.includes(action)}
                      onChange={(e) => handleMultiSelectChange('actions', action, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{action.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Resources</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {resourceTypes.map((resource) => (
                  <label key={resource} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.resources.includes(resource)}
                      onChange={(e) => handleMultiSelectChange('resources', resource, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{resource}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
              <div className="space-y-2">
                {statusTypes.map((status) => (
                  <label key={status} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={(e) => handleMultiSelectChange('status', status, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Risk Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Risk Level</label>
              <div className="space-y-2">
                {riskLevels.map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.riskLevel.includes(level)}
                      onChange={(e) => handleMultiSelectChange('riskLevel', level, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;