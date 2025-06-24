import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './menu';

const FetchModule = lazy(() => import('./FetchModule'));
const VirtualListModule = lazy(() => import('./virtualListModule'));
const DragDropModule = lazy(() => import('./dragDropModule'));


function App() {

  <Router>
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <Menu />

      <nav style={{ margin: '10px 0' }}>
        <Link to="/fetch" style={{ marginRight: 10 }}>Fetch</Link>
        <Link to="/virtual" style={{ marginRight: 10 }}>Virtual List</Link>
        <Link to="/dragdrop">Drag & Drop</Link>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<p>Select a feature using the menu above.</p>} />
          <Route path="/fetch" element={<FetchModule />} />
          <Route path="/virtual" element={<VirtualListModule />} />
          <Route path="/dragdrop" element={<DragDropModule />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
}

export default App;
