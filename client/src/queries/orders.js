import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../lib/axios';

export const orderKeys = {
    all: ['orders'],
    lists: () => [...orderKeys.all, 'list'],
    list: (filters) => [...orderKeys.lists(), { ...filters }],
    details: () => [...orderKeys.all, 'detail'],
    detail: (id) => [...orderKeys.details(), id],
};

export const useOrdersQuery = (params) => {
    const api = useApi();
    return useQuery({
        queryKey: orderKeys.list(params),
        queryFn: async () => {
            const { data } = await api.get('/orders', { params });
            return data;
        },
    });
};

export const useOrderDetailQuery = (id) => {
    const api = useApi();
    return useQuery({
        queryKey: orderKeys.detail(id),
        queryFn: async () => {
            const { data } = await api.get(`/orders/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useCreateOrderMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderData) => api.post('/orders', orderData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
            // Optionally invalidate cart if order creation clears it
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
