import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:8000',
})

// Add mock implementations for Jest
api.get = jest.fn();
api.post = jest.fn();
api.delete = jest.fn();

export default api;