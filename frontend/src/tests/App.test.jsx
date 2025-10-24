import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should render app title', () => {
    render(<App />);
    expect(screen.getByText('Drag & Drop Lists')).toBeInTheDocument();
  });

  it('should render initial seed lists', () => {
    render(<App />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('should render seed items', () => {
    render(<App />);
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Milk')).toBeInTheDocument();
  });

  it('should have sync buttons', () => {
    render(<App />);
    expect(screen.getByText('Save to Server')).toBeInTheDocument();
    expect(screen.getByText('Load from Server')).toBeInTheDocument();
  });

  it('should show New List button', () => {
    render(<App />);
    expect(screen.getByText('New List')).toBeInTheDocument();
  });
});
