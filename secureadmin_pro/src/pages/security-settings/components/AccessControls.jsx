import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccessControls = ({ onChangeDetected, onSaved }) => {
  const [accessConfig, setAccessConfig] = useState({
    ipWhitelistEnabled: true,
    ipBlacklistEnabled: true,
    geoBlocking: false,
    allowedCountries: ['US', 'CA', 'GB'],
    timeBasedAccess: false,
    allowedTimeStart: '09:00',
    allowedTimeEnd: '17:00',
    deviceTrustEnabled: true,
    maxFailedAttempts: 5,
    blockDuration: 60
  });

  const [ipWhitelist, setIpWhitelist] = useState([
    { id: 1, ip: '192.168.1.0/24', description: 'Office Network', active: true },
    { id: 2, ip: '10.0.0.0/8', description: 'VPN Range', active: true },
    { id: 3, ip: '203.0.113.0/24', description: 'Remote Office', active: false }
  ]);

  const [ipBlacklist, setIpBlacklist] = useState([
    { id: 1, ip: '198.51.100.0/24', description: 'Suspicious Range', active: true },
    { id: 2, ip: '203.0.113.50', description: 'Blocked IP', active: true }
  ]);

  const [newIpEntry, setNewIpEntry] = useState({ ip: '', description: '', type: 'whitelist' });
  const [showAddForm, setShowAddForm] = useState(false);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' }
  ];

  const handleConfigChange = (key, value) => {
    setAccessConfig(prev => ({
      ...prev,
      [key]: value
    }));
    onChangeDetected();
  };

  const handleCountryToggle = (countryCode) => {
    const updatedCountries = accessConfig.allowedCountries.includes(countryCode)
      ? accessConfig.allowedCountries.filter(c => c !== countryCode)
      : [...accessConfig.allowedCountries, countryCode];
    
    handleConfigChange('allowedCountries', updatedCountries);
  };

  const handleAddIpEntry = () => {
    if (!newIpEntry.ip.trim()) return;

    const newEntry = {
      id: Date.now(),
      ip: newIpEntry.ip.trim(),
      description: newIpEntry.description.trim() || 'No description',
      active: true
    };

    if (newIpEntry.type === 'whitelist') {
      setIpWhitelist(prev => [...prev, newEntry]);
    } else {
      setIpBlacklist(prev => [...prev, newEntry]);
    }

    setNewIpEntry({ ip: '', description: '', type: 'whitelist' });
    setShowAddForm(false);
    onChangeDetected();
  };

  const handleRemoveIpEntry = (id, type) => {
    if (type === 'whitelist') {
      setIpWhitelist(prev => prev.filter(entry => entry.id !== id));
    } else {
      setIpBlacklist(prev => prev.filter(entry => entry.id !== id));
    }
    onChangeDetected();
  };

  const handleToggleIpEntry = (id, type) => {
    if (type === 'whitelist') {
      setIpWhitelist(prev => prev.map(entry => 
        entry.id === id ? { ...entry, active: !entry.active } : entry
      ));
    } else {
      setIpBlacklist(prev => prev.map(entry => 
        entry.id === id ? { ...entry, active: !entry.active } : entry
      ));
    }
    onChangeDetected();
  };

  const handleSave = () => {
    console.log('Saving access control settings:', {
      config: accessConfig,
      whitelist: ipWhitelist,
      blacklist: ipBlacklist
    });
    onSaved();
  };

  return (
    <div className="space-y-8">
      {/* IP Access Control */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">IP Access Control</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* IP Whitelist */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-text-primary">IP Whitelist</h4>
                <button
                  onClick={() => handleConfigChange('ipWhitelistEnabled', !accessConfig.ipWhitelistEnabled)}
                  className={`
                    relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                    ${accessConfig.ipWhitelistEnabled ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-3 w-3 transform rounded-full bg-white transition-transform
                      ${accessConfig.ipWhitelistEnabled ? 'translate-x-5' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  setNewIpEntry({ ...newIpEntry, type: 'whitelist' });
                  setShowAddForm(true);
                }}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded transition-smooth"
              >
                <Icon name="Plus" size={14} />
                <span>Add IP</span>
              </button>
            </div>

            <div className="space-y-2">
              {ipWhitelist.map((entry) => (
                <div
                  key={entry.id}
                  className={`
                    flex items-center justify-between p-3 border rounded-lg transition-smooth
                    ${entry.active ? 'border-success-200 bg-success-50' : 'border-border bg-secondary-50'}
                  `}
                >
                  <div className="flex-1">
                    <div className="font-mono text-sm text-text-primary">{entry.ip}</div>
                    <div className="text-xs text-text-secondary">{entry.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleIpEntry(entry.id, 'whitelist')}
                      className={`
                        p-1 rounded transition-smooth
                        ${entry.active ? 'text-success hover:bg-success-100' : 'text-secondary-500 hover:bg-secondary-100'}
                      `}
                    >
                      <Icon name={entry.active ? 'Eye' : 'EyeOff'} size={14} />
                    </button>
                    <button
                      onClick={() => handleRemoveIpEntry(entry.id, 'whitelist')}
                      className="p-1 text-error hover:bg-error-50 rounded transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IP Blacklist */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-text-primary">IP Blacklist</h4>
                <button
                  onClick={() => handleConfigChange('ipBlacklistEnabled', !accessConfig.ipBlacklistEnabled)}
                  className={`
                    relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                    ${accessConfig.ipBlacklistEnabled ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-3 w-3 transform rounded-full bg-white transition-transform
                      ${accessConfig.ipBlacklistEnabled ? 'translate-x-5' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  setNewIpEntry({ ...newIpEntry, type: 'blacklist' });
                  setShowAddForm(true);
                }}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded transition-smooth"
              >
                <Icon name="Plus" size={14} />
                <span>Add IP</span>
              </button>
            </div>

            <div className="space-y-2">
              {ipBlacklist.map((entry) => (
                <div
                  key={entry.id}
                  className={`
                    flex items-center justify-between p-3 border rounded-lg transition-smooth
                    ${entry.active ? 'border-error-200 bg-error-50' : 'border-border bg-secondary-50'}
                  `}
                >
                  <div className="flex-1">
                    <div className="font-mono text-sm text-text-primary">{entry.ip}</div>
                    <div className="text-xs text-text-secondary">{entry.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleIpEntry(entry.id, 'blacklist')}
                      className={`
                        p-1 rounded transition-smooth
                        ${entry.active ? 'text-error hover:bg-error-100' : 'text-secondary-500 hover:bg-secondary-100'}
                      `}
                    >
                      <Icon name={entry.active ? 'Eye' : 'EyeOff'} size={14} />
                    </button>
                    <button
                      onClick={() => handleRemoveIpEntry(entry.id, 'blacklist')}
                      className="p-1 text-error hover:bg-error-50 rounded transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add IP Form */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-surface border border-border rounded-lg">
            <h5 className="font-medium text-text-primary mb-3">
              Add to {newIpEntry.type === 'whitelist' ? 'Whitelist' : 'Blacklist'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">IP Address/Range</label>
                <input
                  type="text"
                  value={newIpEntry.ip}
                  onChange={(e) => setNewIpEntry({ ...newIpEntry, ip: e.target.value })}
                  placeholder="192.168.1.0/24"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                <input
                  type="text"
                  value={newIpEntry.description}
                  onChange={(e) => setNewIpEntry({ ...newIpEntry, description: e.target.value })}
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  onClick={handleAddIpEntry}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  <Icon name="Plus" size={16} />
                  <span>Add</span>
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Geographic Access Control */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Geographic Access Control</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
            <div>
              <div className="font-medium text-text-primary">Enable Geographic Blocking</div>
              <div className="text-sm text-text-secondary">Restrict access based on user location</div>
            </div>
            <button
              onClick={() => handleConfigChange('geoBlocking', !accessConfig.geoBlocking)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${accessConfig.geoBlocking ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${accessConfig.geoBlocking ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {accessConfig.geoBlocking && (
            <div className="p-4 bg-surface border border-border rounded-lg">
              <h4 className="font-medium text-text-primary mb-3">Allowed Countries</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryToggle(country.code)}
                    className={`
                      flex items-center space-x-2 p-3 border rounded-lg transition-smooth text-left
                      ${accessConfig.allowedCountries.includes(country.code)
                        ? 'border-primary-200 bg-primary-50 text-primary-700' :'border-border hover:bg-secondary-50'
                      }
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center
                      ${accessConfig.allowedCountries.includes(country.code)
                        ? 'border-primary bg-primary' :'border-secondary-300'
                      }
                    `}>
                      {accessConfig.allowedCountries.includes(country.code) && (
                        <Icon name="Check" size={10} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time-Based Access Control */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Time-Based Access Control</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
            <div>
              <div className="font-medium text-text-primary">Enable Time-Based Access</div>
              <div className="text-sm text-text-secondary">Restrict access to specific time windows</div>
            </div>
            <button
              onClick={() => handleConfigChange('timeBasedAccess', !accessConfig.timeBasedAccess)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${accessConfig.timeBasedAccess ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${accessConfig.timeBasedAccess ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {accessConfig.timeBasedAccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <label className="block text-sm font-medium text-text-primary mb-2">Access Start Time</label>
                <input
                  type="time"
                  value={accessConfig.allowedTimeStart}
                  onChange={(e) => handleConfigChange('allowedTimeStart', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="p-4 bg-surface border border-border rounded-lg">
                <label className="block text-sm font-medium text-text-primary mb-2">Access End Time</label>
                <input
                  type="time"
                  value={accessConfig.allowedTimeEnd}
                  onChange={(e) => handleConfigChange('allowedTimeEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Trust & Brute Force Protection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Security Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Device Trust</div>
                <div className="text-sm text-text-secondary">Track and manage trusted devices</div>
              </div>
              <button
                onClick={() => handleConfigChange('deviceTrustEnabled', !accessConfig.deviceTrustEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${accessConfig.deviceTrustEnabled ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${accessConfig.deviceTrustEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-surface border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-text-primary">Brute Force Protection</div>
                  <div className="text-sm text-text-secondary">Block after failed attempts</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Max Failed Attempts: {accessConfig.maxFailedAttempts}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={accessConfig.maxFailedAttempts}
                    onChange={(e) => handleConfigChange('maxFailedAttempts', parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-text-secondary mt-1">
                    <span>3</span>
                    <span>10</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Block Duration: {accessConfig.blockDuration} minutes
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="1440"
                    step="5"
                    value={accessConfig.blockDuration}
                    onChange={(e) => handleConfigChange('blockDuration', parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-text-secondary mt-1">
                    <span>5m</span>
                    <span>24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
          <Icon name="Download" size={16} />
          <span>Export Access Rules</span>
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

export default AccessControls;