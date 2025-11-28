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