import React, { useState } from 'react';
import Menu from './menu';
import FetchModule from './FetchModule';
import VirtualListModule from './virtualListModule';
import DragDropModule from './dragDropModule';


function App() {

    const [selected, setSelected] = useState(null);  
    const renderModule = () => {
    switch (selected) {
      case 'fetch': return <FetchModule />;
      case 'virtual': return <VirtualListModule />;
      case 'dragdrop': return <DragDropModule />;
      default:
        return <p>Select a feature using the menu above.</p>;
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
    <Menu onSelect={setSelected}  />     
      <div style={{ marginTop: 20 }}>
        {renderModule()}
      </div>

    </div>
  );
}

export default App;
