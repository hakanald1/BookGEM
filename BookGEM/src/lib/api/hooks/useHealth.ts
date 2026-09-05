import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../axios';
import type { Health, Models } from '../../../types/api';

export const useHealth = () => {
  return useQuery<Health>({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get<Health>('/health');
      return response.data;
    },
  });
};

export const useModels = () => {
  return useQuery<Models>({
    queryKey: ['models'],
    queryFn: async () => {
      const response = await apiClient.get<Models>('/models');
      return response.data;
    },
  });
};
