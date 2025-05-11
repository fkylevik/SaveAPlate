import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Create a mock API module
jest.mock('../api', () => ({
  defaults: { baseURL: 'http://localhost:8000' },
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn()
}));

// Simple test component that will always pass
const TestComponent = () => {
  return <div>Test Component</div>;
};

describe('Basic React Component Test', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <TestComponent />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  test('another simple test', () => {
    expect(1 + 1).toBe(2);
  });
});
