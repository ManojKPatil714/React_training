import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SessionManagement = ({ onChangeDetected, onSaved }) => {
  const [sessionConfig, setSessionConfig] = useState({
    maxSessionDuration: 480, // 8 hours in minutes
    idleTimeout: 30,
    concurrentSessions: 3,
    forceLogoutOnPasswordChange: true,
    sessionWarningTime: 5,
    rememberMe: true,
    rememberMeDuration: 30,
    secureSessionCookies: true,
    sessionRotation: true,
    rotationInterval: 60
  });

  const [activeSessions] = useState([
    {
      id: 1,
      user: "admin@company.com",
      device: "Chrome on Windows",
      location: "New York, US",
      ipAddress: "192.168.1.100",
      loginTime: "2024-01-15 09:30:00",
      lastActivity: "2024-01-15 14:45:00",
      status: "active"
    },
    {
      id: 2,
      user: "security@company.com",
      device: "Safari on macOS",
      location: "San Francisco, US",
      ipAddress: "192.168.1.101",
      loginTime: "2024-01-15 08:15:00",
      lastActivity: "2024-01-15 14:30:00",
      status: "active"
    },
    {
      id: 3,
      user: "manager@company.com",
      device: "Chrome on Android",
      location: "London, UK",
      ipAddress: "192.168.1.102",
      loginTime: "2024-01-15 07:00:00",
      lastActivity: "2024-01-15 13:20:00",
      status: "idle"
    }
  ]);

  const handleConfigChange = (key, value) => {
    setSessionConfig(prev => ({
      ...prev,
      [key]: value
    }));
    onChangeDetected();
  };

  const handleSave = () => {
    console.log('Saving session management settings:', sessionConfig);
    onSaved();
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const handleTerminateAllSessions = () => {
    const confirmTerminate = window.confirm('Are you sure you want to terminate all active sessions? This will log out all users.');
    if (confirmTerminate) {
      console.log('Terminating all sessions');
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours} hours`;
  };

  const getSessionStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'idle': return 'text-warning';
      case 'expired': return 'text-error';
      default: return 'text-secondary-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Session Timeout Settings */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Session Timeout Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Maximum Session Duration: {formatDuration(sessionConfig.maxSessionDuration)}
              </label>
              <input
                type="range"
                min="60"
                max="1440"
                step="30"
                value={sessionConfig.maxSessionDuration}
                onChange={(e) => handleConfigChange('maxSessionDuration', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>1h</span>
                <span>24h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Idle Timeout: {sessionConfig.idleTimeout} minutes
              </label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={sessionConfig.idleTimeout}
                onChange={(e) => handleConfigChange('idleTimeout', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>5m</span>
                <span>2h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Session Warning Time: {sessionConfig.sessionWarningTime} minutes before timeout
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={sessionConfig.sessionWarningTime}
                onChange={(e) => handleConfigChange('sessionWarningTime', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>1m</span>
                <span>15m</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Concurrent Sessions: {sessionConfig.concurrentSessions} per user
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={sessionConfig.concurrentSessions}
                onChange={(e) => handleConfigChange('concurrentSessions', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Force Logout on Password Change</div>
                <div className="text-sm text-text-secondary">Terminate all sessions when password is changed</div>
              </div>
              <button
                onClick={() => handleConfigChange('forceLogoutOnPasswordChange', !sessionConfig.forceLogoutOnPasswordChange)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${sessionConfig.forceLogoutOnPasswordChange ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${sessionConfig.forceLogoutOnPasswordChange ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Secure Session Cookies</div>
                <div className="text-sm text-text-secondary">Use secure and HttpOnly cookie flags</div>
              </div>
              <button
                onClick={() => handleConfigChange('secureSessionCookies', !sessionConfig.secureSessionCookies)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${sessionConfig.secureSessionCookies ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${sessionConfig.secureSessionCookies ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Remember Me Settings */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Remember Me Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
            <div>
              <div className="font-medium text-text-primary">Enable Remember Me</div>
              <div className="text-sm text-text-secondary">Allow users to stay logged in across browser sessions</div>
            </div>
            <button
              onClick={() => handleConfigChange('rememberMe', !sessionConfig.rememberMe)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${sessionConfig.rememberMe ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${sessionConfig.rememberMe ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {sessionConfig.rememberMe && (
            <div className="p-4 bg-surface border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-text-primary">Remember Me Duration</div>
                  <div className="text-sm text-text-secondary">How long to keep users logged in</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-text-primary">{sessionConfig.rememberMeDuration}</span>
                  <span className="text-sm text-text-secondary ml-1">days</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="90"
                value={sessionConfig.rememberMeDuration}
                onChange={(e) => handleConfigChange('rememberMeDuration', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>1 day</span>
                <span>90 days</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session Rotation */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Session Rotation</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
            <div>
              <div className="font-medium text-text-primary">Enable Session Rotation</div>
              <div className="text-sm text-text-secondary">Automatically rotate session IDs for enhanced security</div>
            </div>
            <button
              onClick={() => handleConfigChange('sessionRotation', !sessionConfig.sessionRotation)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${sessionConfig.sessionRotation ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${sessionConfig.sessionRotation ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {sessionConfig.sessionRotation && (
            <div className="p-4 bg-surface border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-text-primary">Rotation Interval</div>
                  <div className="text-sm text-text-secondary">How often to rotate session IDs</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-text-primary">{sessionConfig.rotationInterval}</span>
                  <span className="text-sm text-text-secondary ml-1">minutes</span>
                </div>
              </div>
              <input
                type="range"
                min="15"
                max="240"
                step="15"
                value={sessionConfig.rotationInterval}
                onChange={(e) => handleConfigChange('rotationInterval', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>15m</span>
                <span>4h</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Active Sessions</h3>
          <button
            onClick={handleTerminateAllSessions}
            className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-smooth"
          >
            <Icon name="LogOut" size={16} />
            <span>Terminate All</span>
          </button>
        </div>

        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    User & Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Login Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-secondary-50 transition-smooth">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-text-primary">{session.user}</div>
                        <div className="text-sm text-text-secondary">{session.device}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-text-primary">{session.location}</div>
                        <div className="text-xs text-text-secondary">{session.ipAddress}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-text-primary">{session.loginTime}</div>
                        <div className="text-xs text-text-secondary">Last: {session.lastActivity}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getSessionStatusColor(session.status)}`}>
                        <div className={`w-2 h-2 rounded-full mr-1.5 ${
                          session.status === 'active' ? 'bg-success' :
                          session.status === 'idle' ? 'bg-warning' : 'bg-error'
                        }`} />
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-error hover:text-red-700 text-sm font-medium transition-smooth"
                      >
                        Terminate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
          <Icon name="Download" size={16} />
          <span>Export Session Data</span>
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

export default SessionManagement;