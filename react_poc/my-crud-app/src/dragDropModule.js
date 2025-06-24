import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Draggable component definition
function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };
  return <div ref={setNodeRef} style={style} {...listeners} {...attributes}>{children}</div>;
}

// Droppable component definition
function Droppable({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    background: isOver ? '#e0ffe0' : '#f0f0f0',
    minHeight: 80,
    minWidth: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #333',
    marginLeft: 16,
    flexDirection: 'column',
  };
  return (
    <div ref={setNodeRef} style={style}>{children}</div>
  );
}

export default function DragDropModule() {
  const [sourceItems, setSourceItems] = useState(['A', 'B', 'C']);
  const [droppedItems, setDroppedItems] = useState([]);

  function handleDragEnd({ active, over }) {
    if (over && over.id === 'drop-zone') {
      // Move item from source to drop zone
      setSourceItems((items) => items.filter(item => item !== active.id));
      setDroppedItems((items) => [...items, active.id]);
    }
  }

  return (
    <section style={{ padding: 20 }}>
      <h2>Drag & Drop</h2>
      <DndContext
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <h4>Draggables</h4>
            {sourceItems.map(id => (
              <Draggable key={id} id={id}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  border: '1px solid #333',
                  marginBottom: 8,
                  cursor: 'grab'
                }}>
                  {id}
                </span>
              </Draggable>
            ))}
          </div>
          <Droppable id="drop-zone">
            {droppedItems.length === 0 ? <p>Drop items here</p> :
              droppedItems.map(id => (
                <div key={id} style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid green',
                  marginBottom: 8,
                }}>{id}</div>
              ))
            }
          </Droppable>
        </div>
      </DndContext>
    </section>
  );
}
