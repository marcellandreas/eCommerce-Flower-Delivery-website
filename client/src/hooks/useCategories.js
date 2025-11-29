// client/src/hooks/useCategories.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesAPI } from '../services/api';

export const useCategories = () => {
  const api = categoriesAPI();
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getAll().then((res) => {
      console.log('useCategories API Response:', res.data);
      return res.data.data;
    }),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCategory = (identifier) => {
  const api = categoriesAPI();
  return useQuery({
    queryKey: ['category', identifier],
    queryFn: () => api.getBySlug(identifier).then((res) => res.data.data),
    enabled: !!identifier,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const api = categoriesAPI();

  return useMutation({
    mutationFn: (data) => api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};