import React from 'react';

export default function ErrorFallback({ resetError }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h2>😢 Oops! Something went wrong.</h2>
      <p>Please try again later or contact support.</p>
      <button onClick={resetError} style={{ padding: '8px 16px' }}>
        Try Again
      </button>
    </div>
  );
}
