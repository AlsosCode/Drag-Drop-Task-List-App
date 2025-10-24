import { nanoid } from 'nanoid';

/**
 * Creates a new list with a unique ID
 */
export function createList(name) {
  return {
    id: nanoid(),
    name,
    items: [],
  };
}

/**
 * Creates a new item with a unique ID
 */
export function createItem(text) {
  return {
    id: nanoid(),
    text,
    done: false,
  };
}

/**
 * Adds a new list to the state
 */
export function addList(state, name) {
  return {
    ...state,
    lists: [...state.lists, createList(name)],
  };
}

/**
 * Renames a list
 */
export function renameList(state, listId, newName) {
  return {
    ...state,
    lists: state.lists.map(list =>
      list.id === listId ? { ...list, name: newName } : list
    ),
  };
}

/**
 * Deletes a list
 */
export function deleteList(state, listId) {
  return {
    ...state,
    lists: state.lists.filter(list => list.id !== listId),
  };
}

/**
 * Adds a new item to a list
 */
export function addItem(state, listId, text) {
  return {
    ...state,
    lists: state.lists.map(list =>
      list.id === listId
        ? { ...list, items: [...list.items, createItem(text)] }
        : list
    ),
  };
}

/**
 * Edits an item's text
 */
export function editItem(state, listId, itemId, newText) {
  return {
    ...state,
    lists: state.lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map(item =>
              item.id === itemId ? { ...item, text: newText } : item
            ),
          }
        : list
    ),
  };
}

/**
 * Deletes an item from a list
 */
export function deleteItem(state, listId, itemId) {
  return {
    ...state,
    lists: state.lists.map(list =>
      list.id === listId
        ? { ...list, items: list.items.filter(item => item.id !== itemId) }
        : list
    ),
  };
}

/**
 * Toggles an item's done status
 */
export function toggleDone(state, listId, itemId) {
  return {
    ...state,
    lists: state.lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map(item =>
              item.id === itemId ? { ...item, done: !item.done } : item
            ),
          }
        : list
    ),
  };
}

/**
 * Reorders items within the same list
 */
export function reorderItemsInList(state, listId, oldIndex, newIndex) {
  return {
    ...state,
    lists: state.lists.map(list => {
      if (list.id !== listId) return list;

      const items = [...list.items];
      const [movedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, movedItem);

      return { ...list, items };
    }),
  };
}

/**
 * Moves an item from one list to another
 */
export function moveItemBetweenLists(state, fromListId, toListId, itemId, toIndex) {
  let itemToMove = null;

  // Remove item from source list
  const listsWithoutItem = state.lists.map(list => {
    if (list.id === fromListId) {
      const item = list.items.find(i => i.id === itemId);
      if (item) {
        itemToMove = item;
        return { ...list, items: list.items.filter(i => i.id !== itemId) };
      }
    }
    return list;
  });

  if (!itemToMove) return state;

  // Add item to destination list
  const newLists = listsWithoutItem.map(list => {
    if (list.id === toListId) {
      const items = [...list.items];
      items.splice(toIndex, 0, itemToMove);
      return { ...list, items };
    }
    return list;
  });

  return { ...state, lists: newLists };
}

/**
 * Gets initial state with some seed data
 */
export function getInitialState() {
  return {
    lists: [
      {
        id: 'list-1',
        name: 'Today',
        items: [
          { id: 'item-1', text: 'Buy groceries', done: false },
          { id: 'item-2', text: 'Finish project', done: false },
        ],
      },
      {
        id: 'list-2',
        name: 'Groceries',
        items: [
          { id: 'item-3', text: 'Milk', done: false },
          { id: 'item-4', text: 'Eggs', done: true },
          { id: 'item-5', text: 'Bread', done: false },
        ],
      },
    ],
  };
}

/**
 * Saves state to localStorage
 */
export function saveToLocalStorage(state) {
  try {
    localStorage.setItem('drag-drop-lists-state', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Loads state from localStorage
 */
export function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('drag-drop-lists-state');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}
