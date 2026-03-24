import { useState, useCallback } from 'react';
import { getMembers, createMember, updateMember, deleteMember, type Member } from '@/lib/api';
import { members as mockMembers } from '@/lib/mock-data';
import { useApi } from './useApi';

interface UseMembersState {
  members: Member[];
  loading: boolean;
  error: Error | null;
  isUsingFallback: boolean;
  addMember: (member: Omit<Member, 'id'>) => Promise<Member>;
  updateMemberData: (id: number | string, data: Partial<Member>) => Promise<Member>;
  removeMember: (id: number | string) => Promise<void>;
  refetch: () => void;
}

export function useMembers(): UseMembersState {
  const { data, loading, error, isUsingFallback } = useApi<Member[]>(
    '/members',
    mockMembers as Member[]
  );
  const [members, setMembers] = useState<Member[]>(data || mockMembers as Member[]);

  // Update local state when API data changes
  if (data && data !== members) {
    setMembers(data);
  }

  const addMember = useCallback(
    async (memberData: Omit<Member, 'id'>) => {
      try {
        const newMember = await createMember(memberData);
        setMembers((prev) => [...prev, newMember]);
        return newMember;
      } catch (err) {
        console.error('Failed to create member:', err);
        // Still add to local state for optimistic update
        const localMember = {
          ...memberData,
          id: Math.random(),
        } as Member;
        setMembers((prev) => [...prev, localMember]);
        throw err;
      }
    },
    []
  );

  const updateMemberData = useCallback(
    async (id: number | string, data: Partial<Member>) => {
      try {
        const updated = await updateMember(id, data);
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? updated : m))
        );
        return updated;
      } catch (err) {
        console.error('Failed to update member:', err);
        // Optimistic update
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, ...data } : m))
        );
        throw err;
      }
    },
    []
  );

  const removeMember = useCallback(
    async (id: number | string) => {
      try {
        await deleteMember(id);
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        console.error('Failed to delete member:', err);
        // Optimistic update
        setMembers((prev) => prev.filter((m) => m.id !== id));
        throw err;
      }
    },
    []
  );

  const refetch = useCallback(() => {
    // This would typically be implemented with useCallback that refetches
    setMembers(data || mockMembers as Member[]);
  }, [data]);

  return {
    members,
    loading,
    error,
    isUsingFallback,
    addMember,
    updateMemberData,
    removeMember,
    refetch,
  };
}