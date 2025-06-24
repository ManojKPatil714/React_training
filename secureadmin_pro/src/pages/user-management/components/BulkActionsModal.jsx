import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BulkActionsModal = ({ selectedUsers, users, onClose, onActionComplete }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Users',
      description: 'Activate selected user accounts',
      icon: 'UserCheck',
      color: 'success',
      requiresConfirmation: false
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      description: 'Deactivate selected user accounts',
      icon: 'UserX',
      color: 'warning',
      requiresConfirmation: true
    },
    {
      id: 'unlock',
      label: 'Unlock Accounts',
      description: 'Unlock selected user accounts',
      icon: 'Unlock',
      color: 'primary',
      requiresConfirmation: false
    },
    {
      id: 'reset_password',
      label: 'Reset Passwords',
      description: 'Send password reset emails to selected users',
      icon: 'Key',
      color: 'accent',
      requiresConfirmation: true
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Export selected user data to CSV',
      icon: 'Download',
      color: 'secondary',
      requiresConfirmation: false
    },
    {
      id: 'delete',
      label: 'Delete Users',
      description: 'Permanently delete selected user accounts',
      icon: 'Trash2',
      color: 'error',
      requiresConfirmation: true
    }
  ];

  const selectedActionData = bulkActions.find(action => action.id === selectedAction);

  const handleActionSelect = (actionId) => {
    setSelectedAction(actionId);
    const action = bulkActions.find(a => a.id === actionId);
    if (action?.requiresConfirmation) {
      setConfirmAction(true);
    }
  };

  const handleExecuteAction = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      console.log(`Executing ${selectedAction} on users:`, selectedUsers);
      
      // Show success message based on action
      const actionMessages = {
        activate: 'Users have been activated successfully',
        deactivate: 'Users have been deactivated successfully',
        unlock: 'User accounts have been unlocked successfully',
        reset_password: 'Password reset emails have been sent successfully',
        export: 'User data has been exported successfully',
        delete: 'Users have been deleted successfully'
      };

      alert(actionMessages[selectedAction] || 'Action completed successfully');
      
      setIsProcessing(false);
      onActionComplete();
    }, 2000);
  };

  const getActionColor = (color) => {
    const colors = {
      success: 'text-success bg-success-50 border-success-200',
      warning: 'text-warning bg-warning-50 border-warning-200',
      primary: 'text-primary bg-primary-50 border-primary-200',
      accent: 'text-accent bg-accent-50 border-accent-200',
      secondary: 'text-secondary bg-secondary-50 border-secondary-200',
      error: 'text-error bg-error-50 border-error-200'
    };
    return colors[color] || colors.secondary;
  };

  const getButtonColor = (color) => {
    const colors = {
      success: 'bg-success hover:bg-success-700',
      warning: 'bg-warning hover:bg-warning-700',
      primary: 'bg-primary hover:bg-primary-700',
      accent: 'bg-accent hover:bg-accent-700',
      secondary: 'bg-secondary hover:bg-secondary-700',
      error: 'bg-error hover:bg-error-700'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1000 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Bulk Actions</h2>
            <p className="text-text-secondary mt-1">
              Perform actions on {selectedUsers.length} selected user{selectedUsers.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-500 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {!confirmAction ? (
            <div className="space-y-6">
              {/* Selected Users Preview */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Selected Users ({users.length})</h3>
                <div className="bg-secondary-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary-100">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-secondary">{user.email}</p>
                        </div>
                        <span className="text-xs text-text-secondary">{user.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Selection */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Select Action</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionSelect(action.id)}
                      className={`
                        p-4 border-2 rounded-lg text-left transition-smooth hover:shadow-subtle
                        ${selectedAction === action.id 
                          ? getActionColor(action.color)
                          : 'border-border hover:border-secondary-300'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={action.icon} 
                          size={20} 
                          className={selectedAction === action.id ? '' : 'text-secondary-500'} 
                        />
                        <div>
                          <p className="font-medium text-text-primary">{action.label}</p>
                          <p className="text-sm text-text-secondary mt-1">{action.description}</p>
                          {action.requiresConfirmation && (
                            <p className="text-xs text-warning mt-2 flex items-center space-x-1">
                              <Icon name="AlertTriangle" size={12} />
                              <span>Requires confirmation</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={selectedActionData?.requiresConfirmation ? () => setConfirmAction(true) : handleExecuteAction}
                  disabled={!selectedAction || isProcessing}
                  className={`
                    text-white px-6 py-2 rounded-lg transition-smooth flex items-center space-x-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${selectedActionData ? getButtonColor(selectedActionData.color) : 'bg-secondary'}
                  `}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {selectedActionData && <Icon name={selectedActionData.icon} size={16} />}
                      <span>{selectedActionData?.requiresConfirmation ? 'Continue' : 'Execute Action'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation Step */
            <div className="space-y-6">
              <div className="text-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                  ${getActionColor(selectedActionData.color)}
                `}>
                  <Icon name={selectedActionData.icon} size={32} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Confirm {selectedActionData.label}
                </h3>
                <p className="text-text-secondary">
                  Are you sure you want to {selectedActionData.label.toLowerCase()} for {users.length} user{users.length > 1 ? 's' : ''}?
                </p>
              </div>

              {selectedAction === 'delete' && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                    <div>
                      <p className="font-medium text-error">Warning: This action cannot be undone</p>
                      <p className="text-sm text-error-700 mt-1">
                        Deleting users will permanently remove their accounts and all associated data.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Affected Users:</h4>
                <div className="space-y-1">
                  {users.slice(0, 5).map((user) => (
                    <p key={user.id} className="text-sm text-text-secondary">• {user.name} ({user.email})</p>
                  ))}
                  {users.length > 5 && (
                    <p className="text-sm text-text-secondary">• ... and {users.length - 5} more</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
                <button
                  onClick={() => setConfirmAction(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
                >
                  Back
                </button>
                <button
                  onClick={handleExecuteAction}
                  disabled={isProcessing}
                  className={`
                    text-white px-6 py-2 rounded-lg transition-smooth flex items-center space-x-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${getButtonColor(selectedActionData.color)}
                  `}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Icon name={selectedActionData.icon} size={16} />
                      <span>Confirm {selectedActionData.label}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;