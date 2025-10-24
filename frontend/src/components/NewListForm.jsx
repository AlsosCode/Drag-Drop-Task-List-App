import { useState } from 'react';

export default function NewListForm({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-macos-blue text-white rounded-macos button-primary shadow-macos hover:shadow-macos-hover"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-medium">New List</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 fade-in">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name..."
        className="flex-1 px-3 py-2 rounded-macos input-macos text-sm"
        autoFocus
        aria-label="New list name"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-macos-blue text-white rounded-macos button-primary text-sm font-medium"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          setName('');
        }}
        className="px-4 py-2 rounded-macos button-secondary text-sm font-medium"
      >
        Cancel
      </button>
    </form>
  );
}
