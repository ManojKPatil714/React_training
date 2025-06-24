import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PasswordPolicies = ({ onChangeDetected, onSaved }) => {
  const [policies, setPolicies] = useState({
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true,
    preventUserInfo: true,
    passwordHistory: 5,
    maxAge: 90,
    lockoutAttempts: 5,
    lockoutDuration: 30,
    complexityScore: 3
  });

  const [showPreview, setShowPreview] = useState(false);

  const handlePolicyChange = (key, value) => {
    setPolicies(prev => ({
      ...prev,
      [key]: value
    }));
    onChangeDetected();
  };

  const handleSave = () => {
    console.log('Saving password policies:', policies);
    onSaved();
  };

  const handleReset = () => {
    setPolicies({
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventCommonPasswords: true,
      preventUserInfo: true,
      passwordHistory: 5,
      maxAge: 90,
      lockoutAttempts: 5,
      lockoutDuration: 30,
      complexityScore: 3
    });
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (policies.minLength >= 8) score++;
    if (policies.requireUppercase) score++;
    if (policies.requireLowercase) score++;
    if (policies.requireNumbers) score++;
    if (policies.requireSpecialChars) score++;
    if (policies.preventCommonPasswords) score++;
    
    if (score <= 2) return { level: 'Weak', color: 'error', percentage: 33 };
    if (score <= 4) return { level: 'Medium', color: 'warning', percentage: 66 };
    return { level: 'Strong', color: 'success', percentage: 100 };
  };

  const strength = getPasswordStrength();

  const examplePasswords = [
    { password: 'password123', valid: false, reason: 'Common password, no special characters' },
    { password: 'P@ssw0rd!', valid: true, reason: 'Meets all requirements' },
    { password: 'abc123', valid: false, reason: 'Too short, no uppercase, no special characters' },
    { password: 'MySecure2024!', valid: true, reason: 'Strong password meeting all criteria' }
  ];

  return (
    <div className="space-y-8">
      {/* Password Requirements */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Password Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Length Requirements */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Minimum Length: {policies.minLength} characters
              </label>
              <input
                type="range"
                min="6"
                max="20"
                value={policies.minLength}
                onChange={(e) => handlePolicyChange('minLength', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>6</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Maximum Length: {policies.maxLength} characters
              </label>
              <input
                type="range"
                min="20"
                max="256"
                value={policies.maxLength}
                onChange={(e) => handlePolicyChange('maxLength', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>20</span>
                <span>256</span>
              </div>
            </div>
          </div>

          {/* Character Requirements */}
          <div className="space-y-4">
            {[
              { key: 'requireUppercase', label: 'Require Uppercase Letters (A-Z)' },
              { key: 'requireLowercase', label: 'Require Lowercase Letters (a-z)' },
              { key: 'requireNumbers', label: 'Require Numbers (0-9)' },
              { key: 'requireSpecialChars', label: 'Require Special Characters (!@#$)' }
            ].map((requirement) => (
              <div key={requirement.key} className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  {requirement.label}
                </label>
                <button
                  onClick={() => handlePolicyChange(requirement.key, !policies[requirement.key])}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${policies[requirement.key] ? 'bg-primary' : 'bg-secondary-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${policies[requirement.key] ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Security Policies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Prevent Common Passwords
              </label>
              <button
                onClick={() => handlePolicyChange('preventCommonPasswords', !policies.preventCommonPasswords)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${policies.preventCommonPasswords ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${policies.preventCommonPasswords ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Prevent User Information in Password
              </label>
              <button
                onClick={() => handlePolicyChange('preventUserInfo', !policies.preventUserInfo)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${policies.preventUserInfo ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${policies.preventUserInfo ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password History: {policies.passwordHistory} passwords
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={policies.passwordHistory}
                onChange={(e) => handlePolicyChange('passwordHistory', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0</span>
                <span>24</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password Max Age: {policies.maxAge} days
              </label>
              <input
                type="range"
                min="30"
                max="365"
                value={policies.maxAge}
                onChange={(e) => handlePolicyChange('maxAge', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>30</span>
                <span>365</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Lockout After: {policies.lockoutAttempts} failed attempts
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={policies.lockoutAttempts}
                onChange={(e) => handlePolicyChange('lockoutAttempts', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>3</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Lockout Duration: {policies.lockoutDuration} minutes
              </label>
              <input
                type="range"
                min="5"
                max="120"
                value={policies.lockoutDuration}
                onChange={(e) => handlePolicyChange('lockoutDuration', parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>5</span>
                <span>120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Strength Indicator */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Current Policy Strength</h3>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary">Policy Strength</span>
            <span className={`text-sm font-semibold text-${strength.color}`}>
              {strength.level}
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-${strength.color} transition-all duration-300`}
              style={{ width: `${strength.percentage}%` }}
            />
          </div>
          
          <p className="text-xs text-text-secondary mt-2">
            Based on current password policy configuration
          </p>
        </div>
      </div>

      {/* Password Examples */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Password Examples</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-smooth"
          >
            <Icon name={showPreview ? 'EyeOff' : 'Eye'} size={16} />
            <span>{showPreview ? 'Hide' : 'Show'} Examples</span>
          </button>
        </div>

        {showPreview && (
          <div className="bg-secondary-50 rounded-lg p-4">
            <div className="space-y-3">
              {examplePasswords.map((example, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
                  <div className="flex items-center space-x-3">
                    <code className="font-mono text-sm bg-secondary-100 px-2 py-1 rounded">
                      {example.password}
                    </code>
                    <span className="text-sm text-text-secondary">{example.reason}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${example.valid ? 'text-success' : 'text-error'}`}>
                    <Icon name={example.valid ? 'CheckCircle' : 'XCircle'} size={16} />
                    <span className="text-sm font-medium">
                      {example.valid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
        >
          <Icon name="RotateCcw" size={16} />
          <span>Reset to Defaults</span>
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

export default PasswordPolicies;