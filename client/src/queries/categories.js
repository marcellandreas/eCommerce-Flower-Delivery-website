import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../lib/axios';

export const categoryKeys = {
    all: ['categories'],
    lists: () => [...categoryKeys.all, 'list'],
    list: (filters) => [...categoryKeys.lists(), { ...filters }],
    details: () => [...categoryKeys.all, 'detail'],
    detail: (id) => [...categoryKeys.details(), id],
};

export const useCategoriesQuery = (params) => {
    const api = useApi();
    return useQuery({
        queryKey: categoryKeys.list(params),
        queryFn: async () => {
            const { data } = await api.get('/categories', { params });
            return data;
        },
    });
};

export const useCategoryDetailQuery = (id) => {
    const api = useApi();
    return useQuery({
        queryKey: categoryKeys.detail(id),
        queryFn: async () => {
            const { data } = await api.get(`/categories/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useCreateCategoryMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCategory) => api.post('/categories', newCategory),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
};

export const useUpdateCategoryMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/categories/${id}`, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
};

export const useDeleteCategoryMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.delete(`/categories/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
};
