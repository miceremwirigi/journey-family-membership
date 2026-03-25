import { useState, useCallback } from 'react';
import { getFamilies, createFamily, updateFamily, deleteFamily, type Family } from '@/lib/api';
import { families as mockFamilies } from '@/lib/mock-data';
import { useApi } from './useApi';

interface UseFamiliesState {
  families: Family[];
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
  addFamily: (family: Omit<Family, 'id'>) => Promise<Family>;
  updateFamilyData: (id: string, data: Partial<Family>) => Promise<Family>;
  removeFamily: (id: string) => Promise<void>;
}

export function useFamilies(): UseFamiliesState {
  const { data, loading, error, isUsingFallback } = useApi<Family[]>(
    '/families',
    mockFamilies as Family[]
  );
  const [families, setFamilies] = useState<Family[]>(data || mockFamilies as Family[]);

  if (data && data !== families) {
    setFamilies(data);
  }

  const addFamily = useCallback(
    async (familyData: Omit<Family, 'id'>) => {
      try {
        const newFamily = await createFamily(familyData);
        setFamilies((prev) => [...prev, newFamily]);
        return newFamily;
      } catch (err) {
        const localFamily = {
          ...familyData,
          id: `temp-${Math.random()}`,
        } as Family;
        setFamilies((prev) => [...prev, localFamily]);
        throw err;
      }
    },
    []
  );

  const updateFamilyData = useCallback(
    async (id: string, data: Partial<Family>) => {
      try {
        const updated = await updateFamily(id, data);
        setFamilies((prev) =>
          prev.map((f) => (f.id === id ? updated : f))
        );
        return updated;
      } catch (err) {
        setFamilies((prev) =>
          prev.map((f) => (f.id === id ? { ...f, ...data } : f))
        );
        throw err;
      }
    },
    []
  );

  const removeFamily = useCallback(
    async (id: string) => {
      try {
        await deleteFamily(id);
        setFamilies((prev) => prev.filter((f) => f.id !== id));
      } catch (err) {
        setFamilies((prev) => prev.filter((f) => f.id !== id));
        throw err;
      }
    },
    []
  );

  return {
    families,
    loading,
    error,
    isUsingFallback,
    addFamily,
    updateFamilyData,
    removeFamily,
  };
}