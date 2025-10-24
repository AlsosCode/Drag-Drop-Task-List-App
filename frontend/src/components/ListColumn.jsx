import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import DraggableItem from './DraggableItem';

export default function ListColumn({ list, onRename, onDelete, onAddItem, onEditItem, onDeleteItem, onToggleDone }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [newItemText, setNewItemText] = useState('');

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const itemIds = list.items.map(item => `${list.id}:${item.id}`);

  const handleRename = () => {
    if (newName.trim() && newName !== list.name) {
      onRename(list.id, newName.trim());
    }
    setIsRenaming(false);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAddItem(list.id, newItemText.trim());
      setNewItemText('');
    }
  };

  return (
    <div className="list-column bg-macos-bg-secondary dark:bg-macos-dark-bg-secondary rounded-macos-lg shadow-macos dark:shadow-lg p-4 w-80 flex-shrink-0 flex flex-col fade-in transition-colors duration-300">
      {/* List Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-macos-border-light dark:border-macos-dark-border-light">
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setNewName(list.name);
                setIsRenaming(false);
              }
            }}
            className="flex-1 px-2 py-1 rounded-md input-macos font-semibold text-lg"
            autoFocus
            aria-label="Rename list"
          />
        ) : (
          <h2
            className="text-lg font-semibold text-macos-text dark:text-macos-dark-text cursor-pointer hover:text-macos-blue transition-colors"
            onDoubleClick={() => setIsRenaming(true)}
          >
            {list.name}
          </h2>
        )}

        <button
          onClick={() => {
            if (confirm(`Delete list "${list.name}"?`)) {
              onDelete(list.id);
            }
          }}
          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-macos-red rounded transition-colors ml-2"
          aria-label="Delete list"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 5H15M6 5V3H12V5M7 8V12M11 8V12M5 5L6 15H12L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Items Container */}
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className="flex-1 overflow-y-auto mb-3 min-h-[200px]"
          role="list"
        >
          {list.items.map(item => (
            <DraggableItem
              key={item.id}
              item={item}
              listId={list.id}
              onEdit={(itemId, newText) => onEditItem(list.id, itemId, newText)}
              onDelete={(itemId) => onDeleteItem(list.id, itemId)}
              onToggleDone={(itemId) => onToggleDone(list.id, itemId)}
            />
          ))}
        </div>
      </SortableContext>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add item..."
            className="flex-1 px-3 py-2 rounded-macos input-macos text-sm"
            aria-label="New item"
          />
          <button
            type="submit"
            className="p-2 bg-macos-blue text-white rounded-macos button-primary"
            aria-label="Add item"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </form>

      {/* Item Count */}
      <div className="mt-3 text-xs text-macos-text-secondary dark:text-macos-dark-text-secondary text-center">
        {list.items.filter(item => !item.done).length} of {list.items.length} items
      </div>
    </div>
  );
}
