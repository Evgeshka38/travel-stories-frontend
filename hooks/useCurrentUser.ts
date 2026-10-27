'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/clientApi';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });
}