import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../lib/axios';



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
    const api = useApi();
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
    const api = useApi();
    return useQuery({
        queryKey: productKeys.detail(idOrSlug),
        queryFn: async () => {
            const { data } = await api.get(`/products/${idOrSlug}`);
            return data;
        },
        enabled: !!idOrSlug,
    });
};

export const useProductsByCategoryQuery = (slug, params) => {
    const api = useApi();
    return useQuery({
        queryKey: [...productKeys.list(params), 'category', slug],
        queryFn: async () => {
            const { data } = await api.get(`/products/category/${slug}`, { params });
            return data;
        },
        enabled: !!slug,
        keepPreviousData: true,
    });
};

// --- Mutations ---

export const useCreateProductMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => api.post('/products', newProduct),
        onSuccess: () => {
            // Invalidate all product queries (including lists with different filters)
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

export const useUpdateProductMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/products/${id}`, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};

export const useDeleteProductMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.delete(`/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
};
