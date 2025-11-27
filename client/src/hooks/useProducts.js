import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsAPI } from '../services/api';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsAPI.getAll(params).then((res) => res.data.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (identifier) => {
  return useQuery({
    queryKey: ['product', identifier],
    queryFn: () => productsAPI.getBySlug(identifier).then((res) => res.data.data),
    enabled: !!identifier,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsAPI.getFeatured().then((res) => res.data.data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (categorySlug, params) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug, params],
    queryFn: () =>
      productsAPI.getByCategory(categorySlug, params).then((res) => res.data.data),
    enabled: !!categorySlug,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => productsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// client/src/hooks/useCategories.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesAPI } from '../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getAll().then((res) => res.data.data),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCategory = (identifier) => {
  return useQuery({
    queryKey: ['category', identifier],
    queryFn: () => categoriesAPI.getBySlug(identifier).then((res) => res.data.data),
    enabled: !!identifier,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => categoriesAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// client/src/hooks/useOrders.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersAPI } from '../services/api';

export const useOrders = (params) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersAPI.getAll(params).then((res) => res.data.data),
  });
};

export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersAPI.getById(orderId).then((res) => res.data.data),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => ordersAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId) => ordersAPI.cancel(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// client/src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { cartAPI } from '../services/api';
import { addItemLocally, updateItemLocally, removeItemLocally } from '../store/slices/cartSlice';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartAPI.get().then((res) => res.data.data),
    staleTime: 0, // Always fetch fresh cart data
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
  return useMutation({
    mutationFn: (data) => cartAPI.addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error, variables) => {
      // Fallback to local storage for guest users
      const { product_id, quantity } = variables;
      dispatch(addItemLocally({ product: { id: product_id }, quantity }));
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
  return useMutation({
    mutationFn: ({ itemId, quantity }) => cartAPI.updateItem(itemId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error, variables) => {
      dispatch(updateItemLocally(variables));
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  
  return useMutation({
    mutationFn: (itemId) => cartAPI.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error, itemId) => {
      dispatch(removeItemLocally(itemId));
    },
  });
};