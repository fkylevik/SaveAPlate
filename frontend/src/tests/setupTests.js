import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder polyfill
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;