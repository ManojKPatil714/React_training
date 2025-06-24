import React from 'react';
import Icon from 'components/AppIcon';

const MetricCard = ({ metric, onClick }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-700',
        border: 'border-primary-200'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success-700',
        border: 'border-success-200'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-700',
        border: 'border-warning-200'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent-700',
        border: 'border-accent-200'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const colors = getColorClasses(metric.color);

  return (
    <div
      onClick={onClick}
      className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevation transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon name={metric.icon} size={24} className={colors.icon} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          metric.trend === 'up' ? 'text-success' : 'text-error'
        }`}>
          <Icon 
            name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
          />
          <span>{metric.change}</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary-700 transition-colors">
          {metric.value}
        </h3>
        <p className="text-sm font-medium text-text-primary">{metric.title}</p>
        <p className="text-xs text-text-secondary">{metric.description}</p>
      </div>

      {/* Mini trend visualization */}
      <div className="mt-4 h-2 bg-secondary-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            metric.trend === 'up' ? 'bg-success' : 'bg-error'
          }`}
          style={{ width: `${Math.abs(parseFloat(metric.change))}%` }}
        />
      </div>
    </div>
  );
};

export default MetricCard;