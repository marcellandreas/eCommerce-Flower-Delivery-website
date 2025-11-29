import { useApi } from '../lib/axios';

// Factory functions that accept an axios instance
export const createProductsAPI = (api) => ({
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  getFeatured: () => api.get('/products/featured'),
  getByCategory: (categorySlug, params) =>
    api.get(`/products/category/${categorySlug}`, { params }),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  updateStock: (id, quantity) =>
    api.patch(`/products/${id}/stock`, { quantity }),
});

export const createCategoriesAPI = (api) => ({
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
});

export const createCartAPI = (api) => ({
  get: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/items', data),
  updateItem: (itemId, data) => api.put(`/cart/items/${itemId}`, data),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
});

export const createOrdersAPI = (api) => ({
  create: (data) => api.post('/orders', data),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }),
});

export const createUsersAPI = (api) => ({
  getCurrentUser: () => api.get('/users/me'),
  updateCurrentUser: (data) => api.put('/users/me', data),
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
});

export const createHealthAPI = (api) => ({
  check: () => api.get('/health'),
});

// Hooks for usage in components
export const productsAPI = () => {
  const api = useApi();
  return createProductsAPI(api);
};

export const categoriesAPI = () => {
  const api = useApi();
  return createCategoriesAPI(api);
};

export const cartAPI = () => {
  const api = useApi();
  return createCartAPI(api);
};

export const ordersAPI = () => {
  const api = useApi();
  return createOrdersAPI(api);
};

export const usersAPI = () => {
  const api = useApi();
  return createUsersAPI(api);
};

export const healthAPI = () => {
  const api = useApi();
  return createHealthAPI(api);
};