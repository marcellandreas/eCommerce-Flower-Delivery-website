import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../lib/axios';

export const userKeys = {
    all: ['users'],
    lists: () => [...userKeys.all, 'list'],
    list: (filters) => [...userKeys.lists(), { ...filters }],
    details: () => [...userKeys.all, 'detail'],
    detail: (id) => [...userKeys.details(), id],
    me: () => [...userKeys.all, 'me'],
};

export const useUsersQuery = (params) => {
    const api = useApi();
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: async () => {
            const { data } = await api.get('/users', { params });
            return data;
        },
    });
};

export const useUserDetailQuery = (id) => {
    const api = useApi();
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: async () => {
            const { data } = await api.get(`/users/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useCurrentUserQuery = () => {
    const api = useApi();
    return useQuery({
        queryKey: userKeys.me(),
        queryFn: async () => {
            const { data } = await api.get('/users/me');
            return data;
        },
    });
};

export const useUpdateUserMutation = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => api.put(`/users/${id}`, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};
