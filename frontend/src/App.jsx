import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ListColumn from './components/ListColumn';
import NewListForm from './components/NewListForm';
import DarkModeToggle from './components/DarkModeToggle';
import GoogleAuth from './components/GoogleAuth';
import {
  addList,
  renameList,
  deleteList,
  addItem,
  editItem,
  deleteItem,
  toggleDone,
  reorderItemsInList,
  moveItemBetweenLists,
  getInitialState,
  saveToLocalStorage,
  loadFromLocalStorage,
} from './stateUtils';
import './styles/globals.css';
import './styles/components.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function AppContent() {
  const [state, setState] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved || getInitialState();
  });

  const [activeId, setActiveId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [user, setUser] = useState(() => {
    // Load user from localStorage if exists
    const savedUser = localStorage.getItem('google-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  // List operations
  const handleAddList = (name) => {
    setState(prevState => addList(prevState, name));
  };

  const handleRenameList = (listId, newName) => {
    setState(prevState => renameList(prevState, listId, newName));
  };

  const handleDeleteList = (listId) => {
    setState(prevState => deleteList(prevState, listId));
  };

  // Item operations
  const handleAddItem = (listId, text) => {
    setState(prevState => addItem(prevState, listId, text));
  };

  const handleEditItem = (listId, itemId, newText) => {
    setState(prevState => editItem(prevState, listId, itemId, newText));
  };

  const handleDeleteItem = (listId, itemId) => {
    setState(prevState => deleteItem(prevState, listId, itemId));
  };

  const handleToggleDone = (listId, itemId) => {
    setState(prevState => toggleDone(prevState, listId, itemId));
  };

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Parse IDs
    const [activeListId, activeItemId] = activeId.split(':');
    const isOverList = !overId.includes(':');
    const [overListId, overItemId] = isOverList ? [overId, null] : overId.split(':');

    if (activeListId === overListId) {
      // Same list - reorder
      const list = state.lists.find(l => l.id === activeListId);
      const oldIndex = list.items.findIndex(item => item.id === activeItemId);
      const newIndex = overItemId
        ? list.items.findIndex(item => item.id === overItemId)
        : list.items.length - 1;

      if (oldIndex !== newIndex) {
        setState(prevState => reorderItemsInList(prevState, activeListId, oldIndex, newIndex));
      }
    } else {
      // Different lists - move
      const toList = state.lists.find(l => l.id === overListId);
      const toIndex = overItemId
        ? toList.items.findIndex(item => item.id === overItemId)
        : toList.items.length;

      setState(prevState =>
        moveItemBetweenLists(prevState, activeListId, overListId, activeItemId, toIndex)
      );
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // User authentication handlers
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('google-user', JSON.stringify(userData));
    // Load user's data from server
    handleLoad();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('google-user');
    // Clear lists when logging out
    setState(getInitialState());
  };

  // Sync operations
  const handleSave = async () => {
    if (!user) {
      alert('Please sign in with Google to save to server');
      return;
    }

    setIsSyncing(true);
    try {
      const response = await fetch(`${API_URL}/sync/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId: user.id, data: state }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      alert('Saved to server successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save to server. Is the backend running?');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoad = async () => {
    if (!user) {
      return; // Silently skip if not logged in
    }

    setIsSyncing(true);
    try {
      const response = await fetch(`${API_URL}/sync/load?userId=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load');
      }

      const data = await response.json();
      if (data.lists && data.lists.length > 0) {
        setState(data);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-macos-bg dark:bg-macos-dark-bg p-6 transition-colors duration-300">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-macos-text dark:text-macos-dark-text mb-1">
              Drag & Drop Lists
            </h1>
            <p className="text-sm text-macos-text-secondary dark:text-macos-dark-text-secondary hidden sm:block">
              Create, organize, and manage your tasks with ease
            </p>
          </div>

          {/* Controls: Sync + Google Auth + Dark Mode */}
          <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
            {/* Sync Controls - Only show if logged in */}
            {user && (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSyncing}
                  className="px-3 sm:px-4 py-2 bg-macos-blue text-white rounded-macos button-primary text-xs sm:text-sm font-medium disabled:opacity-50"
                >
                  <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Save to Server'}</span>
                  <span className="sm:hidden">Save</span>
                </button>
                <button
                  onClick={handleLoad}
                  disabled={isSyncing}
                  className="px-3 sm:px-4 py-2 rounded-macos button-secondary text-xs sm:text-sm font-medium disabled:opacity-50 dark:text-macos-dark-text"
                >
                  <span className="hidden sm:inline">Load from Server</span>
                  <span className="sm:hidden">Load</span>
                </button>
              </div>
            )}

            {/* Google Sign In */}
            <GoogleAuth
              user={user}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
            />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          measuring={measuring}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {state.lists.map(list => (
              <ListColumn
                key={list.id}
                list={list}
                onRename={handleRenameList}
                onDelete={handleDeleteList}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                onToggleDone={handleToggleDone}
              />
            ))}

            {/* New List Form */}
            <div className="flex-shrink-0 w-80">
              <NewListForm onAdd={handleAddList} />
            </div>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="bg-white rounded-macos p-3 shadow-macos-drag opacity-90">
                Dragging...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8 text-center text-xs text-macos-text-secondary">
        <p>Keyboard accessible • Touch enabled • Auto-saved to localStorage</p>
      </footer>
    </div>
  );
}

// Wrap with Google OAuth Provider
export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppContent />
    </GoogleOAuthProvider>
  );
}
