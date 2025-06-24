import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();

  const menuItems = [
    { label: 'Fetch', path: '/fetch' },
    { label: 'Virtual List', path: '/virtual' },
    { label: 'Drag & Drop', path: '/dragdrop' },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      {menuItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            marginRight: 12,
            padding: '8px 12px',
            textDecoration: 'none',
            border: location.pathname === item.path ? '2px solid #007BFF' : '1px solid #ccc',
            borderRadius: 6,
            backgroundColor: location.pathname === item.path ? '#E6F0FF' : '#fff',
            color: '#333'
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}