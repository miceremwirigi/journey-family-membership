import { useState, useEffect } from 'react';
import { apiCall } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
}

export function useApi<T>(
  endpoint: string,
  fallbackData: T,
  options?: RequestInit
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
    isUsingFallback: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const result = await apiCall<T>(endpoint, options);
        
        if (isMounted) {
          setState({
            data: result,
            loading: false,
            error: null,
            isUsingFallback: false,
          });
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          console.warn(
            `Failed to fetch from ${endpoint}, using fallback data:`,
            error.message
          );
          
          setState({
            data: fallbackData,
            loading: false,
            error,
            isUsingFallback: true,
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, options]);

  return state;
}