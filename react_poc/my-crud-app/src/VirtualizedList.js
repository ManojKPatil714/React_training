import React from "react";
import { FixedSizeList as List} from "react-window";

const rowCount = 1000;
const rowHeight = 40;
const listHeight = 400;
const listWidth = 300;

const items = Array.from({length: rowCount}, (__, i) =>  `item #${i + 1}`);

const Row = ({index, style}) => (
    <div style={{ ...style, padding: '0 8px', boxSizing: 'border-box' }}>
    {items[index]}
  </div>
)

const VirtualList = () => (
    <List height = {listHeight} width = {listWidth} itemSize={rowHeight} itemCount={rowCount} overscanCount = {5} >{Row}</List>
);

export default VirtualList;

