import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../axios';
import type { GenerateRequest, JobAccepted, ImageRequest, ImageResponse } from '../../../types/api';
import { useBookGemStore } from '../../store/useBookGemStore';

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();
  const addActiveJob = useBookGemStore((state) => state.addActiveJob);

  return useMutation<JobAccepted, Error, GenerateRequest>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<JobAccepted>('/recipe', payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.jobId) {
        addActiveJob(data.jobId);
      }
      queryClient.invalidateQueries({ queryKey: ['userJobs'] });
    },
  });
};

export const useGenerateCookbook = () => {
  const queryClient = useQueryClient();
  const addActiveJob = useBookGemStore((state) => state.addActiveJob);

  return useMutation<JobAccepted, Error, GenerateRequest>({
    mutationFn: async (_payload) => {
      throw new Error("Cookbook generation endpoint is currently disabled. Please generate a single recipe instead.");
    },
    onSuccess: (data) => {
      if (data.jobId) {
        addActiveJob(data.jobId);
      }
      queryClient.invalidateQueries({ queryKey: ['userJobs'] });
    },
  });
};

export const useGenerateIdea = () => {
  const queryClient = useQueryClient();
  const addActiveJob = useBookGemStore((state) => state.addActiveJob);

  return useMutation<JobAccepted, Error, GenerateRequest>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<JobAccepted>('/idea', payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.jobId) {
        addActiveJob(data.jobId);
      }
      queryClient.invalidateQueries({ queryKey: ['userJobs'] });
    },
  });
};

export const useFetchImage = () => {
  const addActiveJob = useBookGemStore((state) => state.addActiveJob);

  return useMutation<ImageResponse | JobAccepted, Error, ImageRequest>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<ImageResponse | JobAccepted>('/image', payload);
      return response.data;
    },
    onSuccess: (data) => {
      if ('jobId' in data && data.jobId) {
        addActiveJob(data.jobId);
      }
    },
  });
};
