import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

export default function DraggableItem({ item, listId, onEdit, onDelete, onToggleDone }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${listId}:${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(item.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(item.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        draggable-item
        bg-white dark:bg-macos-dark-bg-secondary rounded-macos p-3 mb-2 shadow-macos dark:shadow-lg
        flex items-center gap-3 group transition-colors duration-300
        ${isDragging ? 'dragging opacity-50' : ''}
        ${item.done ? 'done' : ''}
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-macos-text-secondary dark:text-macos-dark-text-secondary hover:text-macos-blue transition-colors flex-shrink-0"
        aria-label="Drag handle"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="4" cy="4" r="1.5" />
          <circle cx="4" cy="8" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
          <circle cx="12" cy="4" r="1.5" />
          <circle cx="12" cy="8" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      </div>

      {/* Checkbox */}
      <button
        onClick={() => onToggleDone(item.id)}
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-macos-border dark:border-macos-dark-border hover:border-macos-blue transition-colors flex items-center justify-center"
        aria-label={item.done ? 'Mark as undone' : 'Mark as done'}
      >
        {item.done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="#2997ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Item Text or Input */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 rounded-md input-macos text-sm"
          autoFocus
          aria-label="Edit item"
        />
      ) : (
        <span
          className="flex-1 item-text text-sm select-none cursor-pointer"
          onDoubleClick={() => setIsEditing(true)}
        >
          {item.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-macos-bg dark:hover:bg-macos-dark-bg rounded transition-colors text-macos-text dark:text-macos-dark-text"
            aria-label="Edit item"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11.5 2.5L13.5 4.5L5.5 12.5H3.5V10.5L11.5 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-macos-red rounded transition-colors text-macos-text dark:text-macos-dark-text"
          aria-label="Delete item"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4L12 12M12 4L4 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
