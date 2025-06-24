import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';


const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@secureadmin.com', password: 'SecureAdmin123!' },
    user: { email: 'user@secureadmin.com', password: 'UserPass123!' },
    security: { email: 'security@secureadmin.com', password: 'SecurityOfficer123!' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );
      
      if (isValidCredentials) {
        // Store user session (mock)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/admin-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Try: ${mockCredentials.admin.email} / ${mockCredentials.admin.password}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use the provided mock credentials.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="Shield" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">SecureAdmin Pro</h1>
          <p className="text-text-secondary">Enterprise Security Platform</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-surface border border-border rounded-xl shadow-elevation p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Sign In</h2>
            <p className="text-text-secondary text-sm">Access your secure dashboard</p>
          </div>

          {/* Security Indicators */}
          <div className="flex items-center justify-center space-x-4 mb-6 p-3 bg-success-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-success font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-xs text-success font-medium">256-bit Encryption</span>
            </div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                <div>
                  <p className="text-sm text-error font-medium">Authentication Failed</p>
                  <p className="text-xs text-error-700 mt-1">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <Icon name="Mail" size={18} className="absolute left-3 top-3.5 text-secondary-500" />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth ${
                    errors.password ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Icon name="Lock" size={18} className="absolute left-3 top-3.5 text-secondary-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-secondary-500 hover:text-text-primary transition-smooth"
                  disabled={isLoading}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-smooth"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* MFA Setup Guidance */}
          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Smartphone" size={16} className="text-secondary-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">Multi-Factor Authentication</h4>
                <p className="text-xs text-text-secondary">
                  For enhanced security, MFA will be required after first login. Ensure your authenticator app is ready.
                </p>
              </div>
            </div>
          </div>

          {/* Last Login Info */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Last successful login:</span>
              <span>Dec 15, 2024 at 2:30 PM</span>
            </div>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-warning-800 mb-1">Demo Credentials</h4>
              <div className="text-xs text-warning-700 space-y-1">
                <p><strong>Admin:</strong> {mockCredentials.admin.email} / {mockCredentials.admin.password}</p>
                <p><strong>User:</strong> {mockCredentials.user.email} / {mockCredentials.user.password}</p>
                <p><strong>Security:</strong> {mockCredentials.security.email} / {mockCredentials.security.password}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} SecureAdmin Pro. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-smooth">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;