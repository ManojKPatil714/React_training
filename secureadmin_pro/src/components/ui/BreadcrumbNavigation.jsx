import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/admin-dashboard': { label: 'Dashboard', parent: null },
    '/user-management': { label: 'User Management', parent: '/admin-dashboard' },
    '/security-settings': { label: 'Security Settings', parent: '/admin-dashboard' },
    '/system-monitoring': { label: 'System Monitoring', parent: '/admin-dashboard' },
    '/audit-logs': { label: 'Audit Logs', parent: '/admin-dashboard' }
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];
    
    if (currentPath === '/login-screen') {
      return [];
    }

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/admin-dashboard',
      isActive: currentPath === '/admin-dashboard'
    });

    // Add current page if it's not dashboard
    if (currentPath !== '/admin-dashboard' && routeMap[currentPath]) {
      breadcrumbs.push({
        label: routeMap[currentPath].label,
        path: currentPath,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        <Icon name="Home" size={16} className="text-secondary-500" />
        
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-secondary-400" />
            )}
            
            {crumb.isActive ? (
              <span className="font-medium text-text-primary">
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb.path)}
                className="text-text-secondary hover:text-primary transition-smooth font-medium"
              >
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="hidden md:flex items-center ml-auto space-x-2">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-1 px-2 py-1 text-xs text-secondary-600 hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
          title="Refresh page"
        >
          <Icon name="RotateCcw" size={14} />
          <span>Refresh</span>
        </button>
        
        <button
          onClick={() => console.log('Help opened')}
          className="flex items-center space-x-1 px-2 py-1 text-xs text-secondary-600 hover:text-text-primary hover:bg-secondary-50 rounded transition-smooth"
          title="Get help"
        >
          <Icon name="HelpCircle" size={14} />
          <span>Help</span>
        </button>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;