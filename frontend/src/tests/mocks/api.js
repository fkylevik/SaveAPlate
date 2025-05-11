import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add mock implementations for Jest
api.get = jest.fn();
api.post = jest.fn();
api.delete = jest.fn();

export default api;