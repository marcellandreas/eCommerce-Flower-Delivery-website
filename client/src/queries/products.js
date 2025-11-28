import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

// Query Keys
export const productKeys = {
    all: ['products'],
    lists: () => [...productKeys.all, 'list'],
    list: (filters) => [...productKeys.lists(), { ...filters }],
    details: () => [...productKeys.all, 'detail'],
    detail: (id) => [...productKeys.details(), id],
};

// --- Queries ---

export const useProductsQuery = (params) => {
    return useQuery({
        queryKey: productKeys.list(params),
        queryFn: async () => {
            const { data } = await api.get('/products', { params });
            return data;
        },
        keepPreviousData: true,
    });
};

export const useProductDetailQuery = (idOrSlug) => {
    return useQuery({
        queryKey: productKeys.detail(idOrSlug),
        queryFn: async () => {
            const { data } = await api.get(`/products/${idOrSlug}`);
            return data;
        },
        enabled: !!idOrSlug,
    });
};

// --- Mutations ---

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => api.post('/products', newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};

export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/products/${id}`, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.delete(`/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};
