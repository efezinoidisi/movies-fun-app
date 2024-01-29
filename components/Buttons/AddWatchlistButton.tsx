'use client';
import { useSession } from 'next-auth/react';
import Icons from '@/lib/icons';
import Button from '../Button';
import { addToWatchList, removeFromWatchList } from '@/utils/actions';
import { merge } from '@/utils/merge';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useList from 'hooks/useList';
import { UserListType } from 'types/user';

type Props = {
  movie: MediaItem;
  showText?: boolean;
  border?: boolean;
  extraStyles?: string;
};

export default function AddWatchlistButton(props: Props) {
  const queryClient = useQueryClient();
  const { movie, showText = false, border = false, extraStyles = '' } = props;

  const { watchlist } = useList();
  const { status } = useSession();
  const type = movie?.name ? 'tv' : 'movies';
  const movieInWatchList = watchlist[type].find((film) => film.id === movie.id);

  const { mutateAsync } = useMutation({
    mutationKey: ['user-data'],
    mutationFn: (movie) => {
      if (movieInWatchList === undefined) return addToWatchList(movie);

      return removeFromWatchList(movie);
    },
    onMutate: async (movie: MediaItem) => {
      await queryClient.cancelQueries({ queryKey: ['user-data'] });

      const previousData = queryClient.getQueryData(['user-data']);

      queryClient.setQueryData(['user-data'], (oldData: UserListType) => {
        if (movieInWatchList === undefined) {
          return {
            ...oldData,
            watchlist: {
              ...oldData.watchlist,
              [type]: [...oldData.watchlist[type], movie],
            },
          };
        }

        const newData = oldData.watchlist[type].filter(
          (item) => item.id !== movie.id
        );
        return {
          ...oldData,
          watchlist: {
            ...oldData.watchlist,
            [type]: newData,
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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (status === 'unauthenticated') {
      toast.error('please login!', {
        position: 'top-center',
        duration: 9000,
        style: { backgroundColor: '#000', color: '#fff' },
      });
      return;
    }

    try {
      await mutateAsync(movie);
      toast.success(
        `${movie.name || movie.title} ${
          movieInWatchList === undefined
            ? 'added to watchlist'
            : 'removed from watchlist'
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
        `py-2 md:py-4 truncate hover:bg-white/80 hover:text-background transition-colors duration-200 ease-linear md:min-w-[11rem] capitalize px-2 md:px-4 rounded-lg flex gap-2 items-center text-sm font-medium group cursor-pointer h-12 w-full justify-center`,
        border && 'border',
        extraStyles
      )}
      type='button'
      onClick={handleClick}
      title='add to watchlist'
    >
      {movieInWatchList ? (
        <Icons.bookmarkCheck className='text-xl' />
      ) : (
        <Icons.bookmark className='text-xl' />
      )}
      {showText && (movieInWatchList ? 'remove' : 'add watchlist')}
    </Button>
  );
}
