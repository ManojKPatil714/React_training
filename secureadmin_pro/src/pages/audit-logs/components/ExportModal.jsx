import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ isOpen, onClose, onExport, totalLogs }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeDetails: true,
    includeMetadata: false,
    dateRange: 'all',
    customDateStart: '',
    customDateEnd: '',
    fields: {
      timestamp: true,
      user: true,
      action: true,
      resource: true,
      ipAddress: true,
      status: true,
      riskLevel: true,
      details: false,
      metadata: false
    }
  });
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState({
    frequency: 'daily',
    time: '09:00',
    recipients: ['admin@company.com']
  });

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(exportFormat, {
      ...exportOptions,
      scheduled: isScheduled ? scheduleOptions : null
    });
  };

  const handleFieldToggle = (field) => {
    setExportOptions({
      ...exportOptions,
      fields: {
        ...exportOptions.fields,
        [field]: !exportOptions.fields[field]
      }
    });
  };

  const addRecipient = () => {
    const email = prompt('Enter email address:');
    if (email && email.includes('@')) {
      setScheduleOptions({
        ...scheduleOptions,
        recipients: [...scheduleOptions.recipients, email]
      });
    }
  };

  const removeRecipient = (index) => {
    setScheduleOptions({
      ...scheduleOptions,
      recipients: scheduleOptions.recipients.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-surface rounded-lg shadow-elevation w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Export Audit Logs</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="X" size={20} className="text-secondary-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Summary */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="font-medium text-primary">Export Summary</span>
            </div>
            <p className="text-sm text-primary-700">
              You are about to export {totalLogs.toLocaleString()} audit log entries.
            </p>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'csv', label: 'CSV', icon: 'FileText', description: 'Comma-separated values' },
                { value: 'json', label: 'JSON', icon: 'Code', description: 'JavaScript Object Notation' },
                { value: 'pdf', label: 'PDF', icon: 'FileText', description: 'Portable Document Format' }
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() => setExportFormat(format.value)}
                  className={`p-4 border rounded-lg text-left transition-smooth ${
                    exportFormat === format.value
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300'
                  }`}
                >
                  <Icon name={format.icon} size={20} className="mb-2" />
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-text-secondary">{format.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Date Range</label>
            <div className="space-y-3">
              <div className="flex space-x-4">
                {[
                  { value: 'all', label: 'All Time' },
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'Last 7 Days' },
                  { value: 'month', label: 'Last 30 Days' },
                  { value: 'custom', label: 'Custom Range' }
                ].map((range) => (
                  <label key={range.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="dateRange"
                      value={range.value}
                      checked={exportOptions.dateRange === range.value}
                      onChange={(e) => setExportOptions({ ...exportOptions, dateRange: e.target.value })}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{range.label}</span>
                  </label>
                ))}
              </div>

              {exportOptions.dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                    <input
                      type="datetime-local"
                      value={exportOptions.customDateStart}
                      onChange={(e) => setExportOptions({ ...exportOptions, customDateStart: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">End Date</label>
                    <input
                      type="datetime-local"
                      value={exportOptions.customDateEnd}
                      onChange={(e) => setExportOptions({ ...exportOptions, customDateEnd: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fields Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Include Fields</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(exportOptions.fields).map(([field, checked]) => (
                <label key={field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleFieldToggle(field)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Additional Options</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeDetails}
                  onChange={(e) => setExportOptions({ ...exportOptions, includeDetails: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Include detailed event information</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeMetadata}
                  onChange={(e) => setExportOptions({ ...exportOptions, includeMetadata: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Include technical metadata</span>
              </label>
            </div>
          </div>

          {/* Scheduled Export */}
          <div>
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-text-primary">Schedule recurring export</span>
            </label>

            {isScheduled && (
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Frequency</label>
                    <select
                      value={scheduleOptions.frequency}
                      onChange={(e) => setScheduleOptions({ ...scheduleOptions, frequency: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Time</label>
                    <input
                      type="time"
                      value={scheduleOptions.time}
                      onChange={(e) => setScheduleOptions({ ...scheduleOptions, time: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-text-secondary">Email Recipients</label>
                    <button
                      onClick={addRecipient}
                      className="text-xs text-primary hover:text-primary-700 transition-smooth"
                    >
                      + Add Recipient
                    </button>
                  </div>
                  <div className="space-y-2">
                    {scheduleOptions.recipients.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-surface border border-border rounded px-3 py-2">
                        <span className="text-sm text-text-primary">{email}</span>
                        <button
                          onClick={() => removeRecipient(index)}
                          className="text-error hover:text-error-700 transition-smooth"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Export will be processed in the background
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>{isScheduled ? 'Schedule Export' : 'Export Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;