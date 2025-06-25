import React, { useState, useCallback } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon,
  ListItemText, IconButton, Divider, Box, Tooltip
} from '@mui/material';
import {
  Dashboard, BarChart, Settings, ChevronLeft, ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const drawerWidth = 200;

export default function AppDrawer() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  //const toggleDrawer = () => setOpen(!open);
  const toggleDrawer = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const menuItems = useMemo(() => [
    { label: 'Dashboard', icon: <Dashboard />, path: '/' },
    { label: 'Reports', icon: <BarChart />, path: '/reports' },
    { label: 'Settings', icon: <Settings />, path: '/settings' },
    { label: 'FetchModule', icon: <Dashboard />, path: '/fetchmodule' },
    { label: 'VirtualListModule', icon: <BarChart />, path: '/virtuallist' },
    { label: 'dragDropModule', icon: <Settings />, path: '/dragdrop' }
  ], []);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          width: open ? drawerWidth : 60,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', p: 1 }}>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map(({ label, icon, path }) => {
          const selected = location.pathname === path;
          return (
            <Tooltip key={path} title={!open ? label : ''} placement="right">
              <ListItem
                button
                onClick={() => navigate(path)}
                selected={selected}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                {open && <ListItemText primary={label} />}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
}
