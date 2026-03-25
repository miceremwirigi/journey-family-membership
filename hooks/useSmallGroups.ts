import { useState, useCallback } from 'react';
import { getSmallGroups, createSmallGroup, updateSmallGroup, deleteSmallGroup, type SmallGroup } from '@/lib/api';
import { smallGroups as mockSmallGroups } from '@/lib/mock-data';
import { useApi } from './useApi';

interface UseSmallGroupsState {
  groups: SmallGroup[];
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
  addGroup: (group: Omit<SmallGroup, 'id'>) => Promise<SmallGroup>;
  updateGroupData: (id: string, data: Partial<SmallGroup>) => Promise<SmallGroup>;
  removeGroup: (id: string) => Promise<void>;
}

export function useSmallGroups(): UseSmallGroupsState {
  const { data, loading, error, isUsingFallback } = useApi<SmallGroup[]>(
    '/small-groups',
    mockSmallGroups as SmallGroup[]
  );
  const [groups, setGroups] = useState<SmallGroup[]>(data || mockSmallGroups as SmallGroup[]);

  if (data && data !== groups) {
    setGroups(data);
  }

  const addGroup = useCallback(
    async (groupData: Omit<SmallGroup, 'id'>) => {
      try {
        const newGroup = await createSmallGroup(groupData);
        setGroups((prev) => [...prev, newGroup]);
        return newGroup;
      } catch (err) {
        const localGroup = {
          ...groupData,
          id: `temp-${Math.random()}`,
        } as SmallGroup;
        setGroups((prev) => [...prev, localGroup]);
        throw err;
      }
    },
    []
  );

  const updateGroupData = useCallback(
    async (id: string, data: Partial<SmallGroup>) => {
      try {
        const updated = await updateSmallGroup(id, data);
        setGroups((prev) =>
          prev.map((g) => (g.id === id ? updated : g))
        );
        return updated;
      } catch (err) {
        setGroups((prev) =>
          prev.map((g) => (g.id === id ? { ...g, ...data } : g))
        );
        throw err;
      }
    },
    []
  );

  const removeGroup = useCallback(
    async (id: string) => {
      try {
        await deleteSmallGroup(id);
        setGroups((prev) => prev.filter((g) => g.id !== id));
      } catch (err) {
        setGroups((prev) => prev.filter((g) => g.id !== id));
        throw err;
      }
    },
    []
  );

  return {
    groups,
    loading,
    error,
    isUsingFallback,
    addGroup,
    updateGroupData,
    removeGroup,
  };
}