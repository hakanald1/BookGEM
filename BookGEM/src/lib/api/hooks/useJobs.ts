import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../axios';
import type { Job } from '../../../types/api';
import { useBookGemStore } from '../../store/useBookGemStore';

export const useUserJobs = () => {
  return useQuery<{ jobs: Job[]; count: number }>({
    queryKey: ['userJobs'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<{ jobs: Job[]; count: number }>('/jobs');
        return response.data;
      } catch (err) {
        console.warn('Unable to fetch user jobs:', err);
        return { jobs: [], count: 0 };
      }
    },
    refetchInterval: 4000, // Auto-refresh user jobs list every 4s
  });
};

export const useJobStatus = (jobId: string | null) => {
  const addCookbook = useBookGemStore((state) => state.addCookbook);
  const addRecipe = useBookGemStore((state) => state.addRecipe);
  const removeActiveJob = useBookGemStore((state) => state.removeActiveJob);

  return useQuery<Job>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await apiClient.get<Job>(`/jobs/${jobId}`);
      const jobData = response.data;

      if (jobData.status === 'done') {
        removeActiveJob(jobId);
        if (jobData.cookbook) {
          addCookbook(jobData.cookbook);
        } else if (jobData.recipe) {
          addRecipe(jobData.recipe);
        }
      } else if (jobData.status === 'error') {
        removeActiveJob(jobId);
      }

      return jobData;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'queued' || status === 'running') {
        return 2000; // Poll every 2 seconds
      }
      return false; // Stop polling when done or error
    },
  });
};
