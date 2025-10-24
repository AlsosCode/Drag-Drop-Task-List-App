import { describe, it, expect } from 'vitest';
import {
  createList,
  createItem,
  addList,
  renameList,
  deleteList,
  addItem,
  editItem,
  deleteItem,
  toggleDone,
  reorderItemsInList,
  moveItemBetweenLists,
} from '../stateUtils';

describe('State Utilities', () => {
  describe('createList', () => {
    it('should create a list with name and empty items', () => {
      const list = createList('Test List');
      expect(list).toHaveProperty('id');
      expect(list.name).toBe('Test List');
      expect(list.items).toEqual([]);
    });
  });

  describe('createItem', () => {
    it('should create an item with text and done=false', () => {
      const item = createItem('Test Item');
      expect(item).toHaveProperty('id');
      expect(item.text).toBe('Test Item');
      expect(item.done).toBe(false);
    });
  });

  describe('addList', () => {
    it('should add a new list to state', () => {
      const state = { lists: [] };
      const newState = addList(state, 'New List');
      expect(newState.lists).toHaveLength(1);
      expect(newState.lists[0].name).toBe('New List');
    });
  });

  describe('renameList', () => {
    it('should rename a list', () => {
      const state = {
        lists: [{ id: '1', name: 'Old Name', items: [] }],
      };
      const newState = renameList(state, '1', 'New Name');
      expect(newState.lists[0].name).toBe('New Name');
    });
  });

  describe('deleteList', () => {
    it('should delete a list by id', () => {
      const state = {
        lists: [
          { id: '1', name: 'List 1', items: [] },
          { id: '2', name: 'List 2', items: [] },
        ],
      };
      const newState = deleteList(state, '1');
      expect(newState.lists).toHaveLength(1);
      expect(newState.lists[0].id).toBe('2');
    });
  });

  describe('addItem', () => {
    it('should add an item to a list', () => {
      const state = {
        lists: [{ id: '1', name: 'List', items: [] }],
      };
      const newState = addItem(state, '1', 'New Item');
      expect(newState.lists[0].items).toHaveLength(1);
      expect(newState.lists[0].items[0].text).toBe('New Item');
    });
  });

  describe('editItem', () => {
    it('should edit an item text', () => {
      const state = {
        lists: [
          {
            id: '1',
            name: 'List',
            items: [{ id: 'item1', text: 'Old Text', done: false }],
          },
        ],
      };
      const newState = editItem(state, '1', 'item1', 'New Text');
      expect(newState.lists[0].items[0].text).toBe('New Text');
    });
  });

  describe('deleteItem', () => {
    it('should delete an item from a list', () => {
      const state = {
        lists: [
          {
            id: '1',
            name: 'List',
            items: [
              { id: 'item1', text: 'Item 1', done: false },
              { id: 'item2', text: 'Item 2', done: false },
            ],
          },
        ],
      };
      const newState = deleteItem(state, '1', 'item1');
      expect(newState.lists[0].items).toHaveLength(1);
      expect(newState.lists[0].items[0].id).toBe('item2');
    });
  });

  describe('toggleDone', () => {
    it('should toggle item done status', () => {
      const state = {
        lists: [
          {
            id: '1',
            name: 'List',
            items: [{ id: 'item1', text: 'Item', done: false }],
          },
        ],
      };
      const newState = toggleDone(state, '1', 'item1');
      expect(newState.lists[0].items[0].done).toBe(true);

      const toggledBack = toggleDone(newState, '1', 'item1');
      expect(toggledBack.lists[0].items[0].done).toBe(false);
    });
  });

  describe('reorderItemsInList', () => {
    it('should reorder items within a list', () => {
      const state = {
        lists: [
          {
            id: '1',
            name: 'List',
            items: [
              { id: 'item1', text: 'Item 1', done: false },
              { id: 'item2', text: 'Item 2', done: false },
              { id: 'item3', text: 'Item 3', done: false },
            ],
          },
        ],
      };
      const newState = reorderItemsInList(state, '1', 0, 2);
      expect(newState.lists[0].items[0].id).toBe('item2');
      expect(newState.lists[0].items[1].id).toBe('item3');
      expect(newState.lists[0].items[2].id).toBe('item1');
    });
  });

  describe('moveItemBetweenLists', () => {
    it('should move an item from one list to another', () => {
      const state = {
        lists: [
          {
            id: 'list1',
            name: 'List 1',
            items: [
              { id: 'item1', text: 'Item 1', done: false },
              { id: 'item2', text: 'Item 2', done: false },
            ],
          },
          {
            id: 'list2',
            name: 'List 2',
            items: [{ id: 'item3', text: 'Item 3', done: false }],
          },
        ],
      };

      const newState = moveItemBetweenLists(state, 'list1', 'list2', 'item1', 0);

      expect(newState.lists[0].items).toHaveLength(1);
      expect(newState.lists[0].items[0].id).toBe('item2');

      expect(newState.lists[1].items).toHaveLength(2);
      expect(newState.lists[1].items[0].id).toBe('item1');
      expect(newState.lists[1].items[1].id).toBe('item3');
    });
  });
});
