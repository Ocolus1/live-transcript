import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IndexedDB
const indexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn(),
};

global.indexedDB = indexedDB as any;

// Mock Web Speech API
global.SpeechRecognition = vi.fn();
global.webkitSpeechRecognition = vi.fn();

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));