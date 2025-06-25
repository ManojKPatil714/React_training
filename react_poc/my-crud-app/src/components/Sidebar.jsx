import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { label: 'Dashboard', path: '/' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' },
    { label: 'FetchModule', path: '/fetchmodule' },
    { label: 'VirtualListModule', path: '/virtuallist' },
    { label: 'dragDropModule', path: '/dragdrop' },
  ];

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      {menu.map(item => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'block',
            padding: '10px',
            marginBottom: 10,
            textDecoration: 'none',
            background: location.pathname === item.path ? '#dbeafe' : '#fff',
            color: '#333',
            borderRadius: 6,
            border: '1px solid #ccc'
          }}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
