import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuIcon sx={{ mr: 2 }} />
        <Typography variant="h6" noWrap component="div">
          LangChain Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
