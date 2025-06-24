import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  maxCount = 99, 
  variant = 'error', 
  size = 'sm',
  className = '',
  showZero = false 
}) => {
  if (!showZero && count === 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const variantClasses = {
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    success: 'bg-success text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white'
  };

  const sizeClasses = {
    xs: 'w-3 h-3 text-xs',
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;