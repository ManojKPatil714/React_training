import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';
import { Box, Toolbar } from '@mui/material';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';

const FetchModule = lazy(() => import('./Pages/FetchModule'));
const VirtualListModule = lazy(() => import('./Pages/virtualListModule'));
const DragDropModule = lazy(() => import('./Pages/dragDropModule'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Reports = lazy(() => import('./Pages/Reports'));
const Settings = lazy(() => import('./Pages/Setting'));

const drawerWidth = 200;
const collapsedWidth = 60;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        <Box component="main" sx={{
            flexGrow: 1,
            transition: 'margin-left 0.3s',
            marginLeft: drawerOpen ? `${drawerWidth}px` : `${collapsedWidth}px`
          }}
        >
        
          <Header toggleDrawer={toggleDrawer} />
          <Toolbar />
          <Box sx={{ p: 3 }}>
            <ErrorBoundary fallback={ErrorFallback}>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/fetchmodule" element={<FetchModule />} />
                  <Route path="/virtuallist" element={<VirtualListModule />} />
                  <Route path="/dragdrop" element={<DragDropModule />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
