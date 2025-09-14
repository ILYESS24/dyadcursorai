import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export function useNavigate() {
  const router = useRouter();
  
  return (url: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };
}

export function useSearch() {
  const searchParams = useSearchParams();
  
  return {
    searchParams,
    get: (key: string) => searchParams.get(key),
  };
}
