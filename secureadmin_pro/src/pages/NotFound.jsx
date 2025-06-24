import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/admin-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-error-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertTriangle" size={48} className="text-error" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-secondary-100 text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-secondary-200 transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@secureadmin.com" className="text-primary hover:text-primary-700 transition-smooth">
              support@secureadmin.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;