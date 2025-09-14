import { useQuery } from '@tanstack/react-query';

export function useAppVersion() {
  return useQuery({
    queryKey: ['app-version'],
    queryFn: async () => {
      // Return a static version for now
      return '0.19.0-beta.1';
    },
    staleTime: Infinity, // Version doesn't change often
  });
}
