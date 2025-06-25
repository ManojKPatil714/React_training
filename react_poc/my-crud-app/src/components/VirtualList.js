import React from "react";
import { FixedSizeList as List} from "react-window";

const rowCount = 100;
const rowHeight = 40;

const items = Array.from({length: rowCount}, (__, i) =>  `item #${i + 1}`);

const Row = ({index, style}) => (
  <div
    style={{
      ...style,
      padding: '0 12px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
      fontSize: '16px',
      color: '#333',
      transition: 'background-color 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eef2ff')}
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9fafb' : '#fff')
    }
  >
    {items[index]}
  </div>
)

const VirtualList = () => (
  <div
    style={{
      height: 'calc(0px + 90vh);',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        height: '100%',
        width: '100%',
      }}
    >
      <List
        height={document.documentElement.clientHeight - 100}
        width={'100%'}
        itemSize={rowHeight}
        itemCount={rowCount}
        overscanCount={5}
      >
        {Row}
      </List>
    </div>
  </div>
);

export default VirtualList;

