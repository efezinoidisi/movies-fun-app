'use client';
import useCustomQuery from 'hooks/useCustomQuery';
import { useSession } from 'next-auth/react';
import { UserListType } from 'types/user';

const initialState = {
  favorites: {
    tv: [],
    movies: [],
  },
  watchlist: {
    tv: [],
    movies: [],
  },
};

export default function useList() {
  const { status } = useSession();

  const { data, isError, isFetching } = useCustomQuery('/api/data', {
    queryKey: ['user-data'],
    staleTime: 60 * 60 * 24,
    enabled: status === 'authenticated',
    placeholderData: initialState,
  });

  const userData = data as UserListType;
  return { ...userData, isFetching, isError };
}
