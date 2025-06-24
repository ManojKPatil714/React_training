import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MFASettings = ({ onChangeDetected, onSaved }) => {
  const [mfaConfig, setMfaConfig] = useState({
    enabled: true,
    enforceForAdmins: true,
    enforceForUsers: false,
    allowedMethods: {
      authenticatorApp: true,
      sms: true,
      email: false,
      hardwareToken: false
    },
    backupCodes: true,
    gracePeriod: 7,
    rememberDevice: true,
    rememberDuration: 30
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('authenticatorApp');

  const handleConfigChange = (key, value) => {
    setMfaConfig(prev => ({
      ...prev,
      [key]: value
    }));
    onChangeDetected();
  };

  const handleMethodChange = (method, enabled) => {
    setMfaConfig(prev => ({
      ...prev,
      allowedMethods: {
        ...prev.allowedMethods,
        [method]: enabled
      }
    }));
    onChangeDetected();
  };

  const handleSave = () => {
    console.log('Saving MFA settings:', mfaConfig);
    onSaved();
  };

  const mfaMethods = [
    {
      id: 'authenticatorApp',
      name: 'Authenticator App',
      description: 'Use apps like Google Authenticator, Authy, or Microsoft Authenticator',
      icon: 'Smartphone',
      recommended: true
    },
    {
      id: 'sms',
      name: 'SMS Text Message',
      description: 'Receive verification codes via SMS',
      icon: 'MessageSquare',
      recommended: false
    },
    {
      id: 'email',
      name: 'Email Verification',
      description: 'Receive verification codes via email',
      icon: 'Mail',
      recommended: false
    },
    {
      id: 'hardwareToken',
      name: 'Hardware Token',
      description: 'Use physical security keys (FIDO2/WebAuthn)',
      icon: 'Key',
      recommended: true
    }
  ];

  const mockQRCode = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgogIDxnIGZpbGw9IiMwMDAiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+CiAgICA8cmVjdCB4PSIyMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+CiAgICA8cmVjdCB4PSI0MCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+CiAgICA8IS0tIE1vcmUgUVIgY29kZSBwYXR0ZXJuIC0tPgogIDwvZz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4K";

  return (
    <div className="space-y-8">
      {/* MFA Status */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Multi-Factor Authentication Status</h3>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${mfaConfig.enabled ? 'bg-success' : 'bg-error'}`} />
              <span className="font-medium text-text-primary">
                MFA is {mfaConfig.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <button
              onClick={() => handleConfigChange('enabled', !mfaConfig.enabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${mfaConfig.enabled ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${mfaConfig.enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {mfaConfig.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">1,247</div>
                <div className="text-text-secondary">Users with MFA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">89</div>
                <div className="text-text-secondary">Pending Setup</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98.2%</div>
                <div className="text-text-secondary">Compliance Rate</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enforcement Policies */}
      {mfaConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Enforcement Policies</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Enforce MFA for Administrators</div>
                <div className="text-sm text-text-secondary">Require all admin users to use MFA</div>
              </div>
              <button
                onClick={() => handleConfigChange('enforceForAdmins', !mfaConfig.enforceForAdmins)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${mfaConfig.enforceForAdmins ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${mfaConfig.enforceForAdmins ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Enforce MFA for All Users</div>
                <div className="text-sm text-text-secondary">Require all users to use MFA</div>
              </div>
              <button
                onClick={() => handleConfigChange('enforceForUsers', !mfaConfig.enforceForUsers)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${mfaConfig.enforceForUsers ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${mfaConfig.enforceForUsers ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-text-primary">Grace Period</div>
                  <div className="text-sm text-text-secondary">Days to allow users to set up MFA</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-text-primary">{mfaConfig.gracePeriod}</span>
                  <span className="text-sm text-text-secondary ml-1">days</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={mfaConfig.gracePeriod}
                onChange={(e) => handleConfigChange('gracePeriod', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MFA Methods */}
      {mfaConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Available MFA Methods</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mfaMethods.map((method) => (
              <div
                key={method.id}
                className={`
                  p-4 border rounded-lg transition-smooth cursor-pointer
                  ${mfaConfig.allowedMethods[method.id] 
                    ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:bg-secondary-50'
                  }
                `}
                onClick={() => handleMethodChange(method.id, !mfaConfig.allowedMethods[method.id])}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${mfaConfig.allowedMethods[method.id] ? 'bg-primary-100' : 'bg-secondary-100'}
                    `}>
                      <Icon 
                        name={method.icon} 
                        size={20} 
                        className={mfaConfig.allowedMethods[method.id] ? 'text-primary-700' : 'text-secondary-500'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{method.name}</h4>
                        {method.recommended && (
                          <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{method.description}</p>
                    </div>
                  </div>
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center
                    ${mfaConfig.allowedMethods[method.id] 
                      ? 'border-primary bg-primary' :'border-secondary-300'
                    }
                  `}>
                    {mfaConfig.allowedMethods[method.id] && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authenticator App Setup */}
      {mfaConfig.enabled && mfaConfig.allowedMethods.authenticatorApp && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Authenticator App Setup</h3>
          
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Setup Instructions</h4>
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">1</span>
                    <span>Download an authenticator app (Google Authenticator, Authy, etc.)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">2</span>
                    <span>Scan the QR code with your authenticator app</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">3</span>
                    <span>Enter the 6-digit code from your app to verify</span>
                  </li>
                </ol>

                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="QrCode" size={16} />
                  <span>{showQRCode ? 'Hide' : 'Show'} QR Code</span>
                </button>
              </div>

              {showQRCode && (
                <div className="text-center">
                  <div className="inline-block p-4 bg-white border border-border rounded-lg">
                    <img 
                      src={mockQRCode} 
                      alt="MFA QR Code" 
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    Scan this QR code with your authenticator app
                  </p>
                  <div className="mt-3 p-2 bg-secondary-100 rounded text-xs font-mono text-text-secondary">
                    Manual entry: JBSWY3DPEHPK3PXP
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Additional Settings */}
      {mfaConfig.enabled && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Enable Backup Codes</div>
                <div className="text-sm text-text-secondary">Allow users to generate backup codes for account recovery</div>
              </div>
              <button
                onClick={() => handleConfigChange('backupCodes', !mfaConfig.backupCodes)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${mfaConfig.backupCodes ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${mfaConfig.backupCodes ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Remember Trusted Devices</div>
                <div className="text-sm text-text-secondary">Allow users to mark devices as trusted</div>
              </div>
              <button
                onClick={() => handleConfigChange('rememberDevice', !mfaConfig.rememberDevice)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${mfaConfig.rememberDevice ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${mfaConfig.rememberDevice ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {mfaConfig.rememberDevice && (
              <div className="p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">Remember Duration</div>
                    <div className="text-sm text-text-secondary">How long to remember trusted devices</div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-text-primary">{mfaConfig.rememberDuration}</span>
                    <span className="text-sm text-text-secondary ml-1">days</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={mfaConfig.rememberDuration}
                  onChange={(e) => handleConfigChange('rememberDuration', parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>1</span>
                  <span>90</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
          <Icon name="Download" size={16} />
          <span>Export Configuration</span>
        </button>

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

export default MFASettings;