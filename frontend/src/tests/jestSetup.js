// src/tests/jestSetup.js
import { createRequire } from 'module';
globalThis.require = createRequire(import.meta.url);

// Mock Vite's import.meta.env
if (!import.meta.env) {
  import.meta.env = {};
}
import.meta.env.VITE_API_URL = 'http://localhost:8000';

// Make Jest available globally
import { jest } from '@jest/globals';
global.jest = jest;