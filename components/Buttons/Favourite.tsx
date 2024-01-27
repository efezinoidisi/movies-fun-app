'use client';
import Icons from '@/lib/icons';
import Button from '../Button';
import toast from 'react-hot-toast';
import { addToFavorites, removeFromFavorites } from '@/utils/actions';
import { merge } from '@/utils/merge';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserListType } from 'types/user';
import useList from 'hooks/useList';

type Position = 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';

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

export default function Favourite({
  movie,
  position = 'static',
  extraStyles = '',
}: {
  movie: MediaItem;
  position?: Position;
  extraStyles?: string;
}) {
  const { status } = useSession();

  const queryClient = useQueryClient();

  const { favorites } = useList();

  const type = movie.name ? 'tv' : 'movie';

  const isFavorite =
    type === 'tv'
      ? favorites.tv.find((film) => film.id === movie.id)
      : favorites.movies.find((film) => film.id === movie.id);

  const { mutateAsync } = useMutation({
    mutationKey: ['user-data'],
    mutationFn: (movie) => {
      if (isFavorite === undefined) return addToFavorites(movie);

      return removeFromFavorites(movie);
    },
    onMutate: async (movie: MediaItem) => {
      await queryClient.cancelQueries({ queryKey: ['user-data'] });

      const previousData = queryClient.getQueryData(['user-data']);

      queryClient.setQueryData(['user-data'], (oldData: UserListType) => {
        if (isFavorite === undefined) {
          return {
            ...oldData,
            favorites: {
              ...oldData.favorites,
              [type === 'movie' ? 'movies' : 'tv']: [
                ...oldData.favorites[type === 'movie' ? 'movies' : 'tv'],
                movie,
              ],
            },
          };
        }

        const newData = oldData.favorites[
          type === 'movie' ? 'movies' : 'tv'
        ].filter((item) => item.id !== movie.id);
        return {
          ...oldData,
          favorites: {
            ...oldData.favorites,
            [type === 'movie' ? 'movies' : 'tv']: newData,
          },
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['user-data'], context?.previousData);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['user-data'] });
    // },
  });

  const handleAddtoFavourites = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (status === 'unauthenticated') {
      toast.error('please login!', {
        position: 'top-center',
        duration: 5000,
      });
      return;
    }

    try {
      await mutateAsync(movie);
      toast.success(
        `${movie.name || movie.title} ${
          isFavorite === undefined
            ? 'added to favorites'
            : 'removed from favorites'
        }`
      );
    } catch (error) {
      console.log('error');
      toast.error('an error occurred!');
    }
  };

  return (
    <Button
      className={merge(
        'px-2 group bg-black/20 py-2 rounded-full flex items-center gap-1 capitalize transition-colors duration-200 ease-in-out',
        position,
        extraStyles
      )}
      onClick={handleAddtoFavourites}
    >
      <Icons.heart
        className={`hover:text-accent text-2xl group-active:animate-heart ${
          isFavorite !== undefined ? 'text-pink-500' : 'text-white'
        }`}
      />
    </Button>
  );
}
