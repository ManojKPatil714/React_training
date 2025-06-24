import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginScreen from "pages/login-screen";
import AdminDashboard from "pages/admin-dashboard";
import UserManagement from "pages/user-management";
import SecuritySettings from "pages/security-settings";
import SystemMonitoring from "pages/system-monitoring";
import AuditLogs from "pages/audit-logs";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/security-settings" element={<SecuritySettings />} />
          <Route path="/system-monitoring" element={<SystemMonitoring />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/" element={<LoginScreen />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;