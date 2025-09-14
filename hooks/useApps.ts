import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useLoadApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: () => apiClient.listApps(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLoadApp(appId: number) {
  return useQuery({
    queryKey: ['app', appId],
    queryFn: () => apiClient.getApp(appId),
    enabled: appId !== null && appId !== undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateApp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; path: string; githubOrg?: string; githubRepo?: string; githubBranch?: string }) =>
      apiClient.createApp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
    onError: (error) => {
      console.error('Error creating app:', error);
    },
  });
}

export function useUpdateApp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiClient.updateApp(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      queryClient.invalidateQueries({ queryKey: ['app', id] });
    },
    onError: (error) => {
      console.error('Error updating app:', error);
    },
  });
}

export function useDeleteApp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteApp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
    onError: (error) => {
      console.error('Error deleting app:', error);
    },
  });
}

export function useExecuteApp() {
  return useMutation({
    mutationFn: ({ appId, command }: { appId: number; command: string }) =>
      apiClient.executeApp(appId, command),
    onError: (error) => {
      console.error('Error executing app:', error);
    },
  });
}

export function useStopApp() {
  return useMutation({
    mutationFn: (appId: number) => apiClient.stopApp(appId),
    onError: (error) => {
      console.error('Error stopping app:', error);
    },
  });
}
