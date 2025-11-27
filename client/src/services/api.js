import axios from '../lib/axios';

// Products API
export const productsAPI = {
  getAll: (params) => axios.get('/products', { params }),
  getById: (id) => axios.get(`/products/${id}`),
  getBySlug: (slug) => axios.get(`/products/${slug}`),
  getFeatured: () => axios.get('/products/featured'),
  getByCategory: (categorySlug, params) => 
    axios.get(`/products/category/${categorySlug}`, { params }),
  create: (data) => axios.post('/products', data),
  update: (id, data) => axios.put(`/products/${id}`, data),
  delete: (id) => axios.delete(`/products/${id}`),
  updateStock: (id, quantity) => 
    axios.patch(`/products/${id}/stock`, { quantity }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => axios.get('/categories'),
  getById: (id) => axios.get(`/categories/${id}`),
  getBySlug: (slug) => axios.get(`/categories/${slug}`),
  create: (data) => axios.post('/categories', data),
  update: (id, data) => axios.put(`/categories/${id}`, data),
  delete: (id) => axios.delete(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => axios.get('/cart'),
  addItem: (data) => axios.post('/cart/items', data),
  updateItem: (itemId, data) => axios.put(`/cart/items/${itemId}`, data),
  removeItem: (itemId) => axios.delete(`/cart/items/${itemId}`),
  clear: () => axios.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  create: (data) => axios.post('/orders', data),
  getAll: (params) => axios.get('/orders', { params }),
  getById: (id) => axios.get(`/orders/${id}`),
  cancel: (id) => axios.post(`/orders/${id}/cancel`),
  updateStatus: (id, status) => 
    axios.patch(`/orders/${id}/status`, { status }),
};

// Users API
export const usersAPI = {
  getCurrentUser: () => axios.get('/users/me'),
  updateCurrentUser: (data) => axios.put('/users/me', data),
  getAll: (params) => axios.get('/users', { params }),
  getById: (id) => axios.get(`/users/${id}`),
  update: (id, data) => axios.put(`/users/${id}`, data),
};

// Health Check
export const healthAPI = {
  check: () => axios.get('/health'),
};