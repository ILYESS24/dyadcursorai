import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => apiClient.getSettings(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiClient.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
    },
  });
}

// Fonctions utilitaires pour les settings
export function getTelemetryUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('telemetry-user-id');
}

export function isTelemetryOptedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('telemetry-opted-in') === 'true';
}

export function setTelemetryOptedIn(value: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('telemetry-opted-in', value.toString());
}

export function generateTelemetryUserId(): string {
  const id = crypto.randomUUID();
  if (typeof window !== 'undefined') {
    localStorage.setItem('telemetry-user-id', id);
  }
  return id;
}
