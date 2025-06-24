import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AddUserModal = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    department: '',
    password: '',
    confirmPassword: '',
    sendWelcomeEmail: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ['IT', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations'];
  const roles = ['User', 'Manager', 'Administrator'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: 'Active',
        lastLogin: new Date(),
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
        joinDate: new Date(),
        permissions: formData.role === 'Administrator' ? ['user_management', 'system_config', 'audit_logs'] : ['basic_access'],
        sessionCount: 0,
        failedLogins: 0,
        accountLocked: false
      };

      onUserAdded(newUser);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1000 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Add New User</h2>
            <p className="text-text-secondary mt-1">Create a new user account with appropriate permissions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-500 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth
                      ${errors.name ? 'border-error' : 'border-border'}
                    `}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-error text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth
                      ${errors.email ? 'border-error' : 'border-border'}
                    `}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role and Department */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Role & Department</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-text-secondary mb-2">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-text-secondary mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth
                      ${errors.department ? 'border-error' : 'border-border'}
                    `}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-error text-sm mt-1">{errors.department}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth
                      ${errors.password ? 'border-error' : 'border-border'}
                    `}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-error text-sm mt-1">{errors.password}</p>
                  )}
                  <p className="text-xs text-text-secondary mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth
                      ${errors.confirmPassword ? 'border-error' : 'border-border'}
                    `}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Options */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="sendWelcomeEmail"
                    checked={formData.sendWelcomeEmail}
                    onChange={handleInputChange}
                    className="rounded border-border focus:ring-primary-500"
                  />
                  <span className="text-text-primary">Send welcome email to user</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Creating User...</span>
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={16} />
                  <span>Create User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;