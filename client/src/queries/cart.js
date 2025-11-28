import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../lib/axios';

export const cartKeys = {
    all: ['cart'],
};

export const useCartQuery = () => {
    const api = useApi();
    return useQuery({
        queryKey: cartKeys.all,
        queryFn: async () => {
            const { data } = await api.get('/cart');
            return data;
        },
    });
};

export const useAddToCartMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item) => api.post('/cart/items', item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};

export const useUpdateCartItemMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ itemId, data }) => api.put(`/cart/items/${itemId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};

export const useRemoveCartItemMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemId) => api.delete(`/cart/items/${itemId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};

export const useClearCartMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.delete('/cart'),
        onSuccess: () => {
            queryClient.setQueryData(cartKeys.all, null); // Or empty array depending on API response
            queryClient.invalidateQueries({ queryKey: cartKeys.all });
        },
    });
};
