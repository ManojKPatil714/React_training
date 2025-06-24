import React from 'react';

export default function Menu({ onSelect }) {
  return (
    <nav style={{ display: 'flex', gap: 10 }}>
      <button onClick={() => onSelect('fetch')}>Fetching & Caching</button>
      <button onClick={() => onSelect('virtual')}>Virtual List</button>
      <button onClick={() => onSelect('dragdrop')}>Drag & Drop</button>
    </nav>
  );
}