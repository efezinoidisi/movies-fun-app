'use client';
import { useSession } from 'next-auth/react';
import Icons from '@/lib/icons';
import { useCallback } from 'react';
import Button from '../Button';
import { addToWatchList, removeFromWatchList } from '@/utils/actions';
import useUserMoviesData from '../../app/context/user-movie-data';
import { merge } from '@/utils/merge';
import toast from 'react-hot-toast';

type Props = {
  id: number;
  showText?: boolean;
  border?: boolean;
  extraStyles?: string;
};

export default function AddWatchlistButton(props: Props) {
  const { id, showText = false, border = false, extraStyles = '' } = props;
  const { data, setData } = useUserMoviesData();
  const { status } = useSession();

  const movieInWatchList = data?.watchlist?.includes(id) ?? false;

  const handleClick = useCallback(
    async (id: number) => {
      if (status === 'unauthenticated') {
        // const urlStringParam = updateUrlParam(searchParams, {
        //   type: 'update',
        //   key: 'watch_modal',
        //   value: 'true',
        // });
        // router.push(path + '?' + urlStringParam);
        toast.error('please login!', {
          position: 'top-center',
          duration: 5000,
        });
        return;
      }

      if (movieInWatchList) {
        removeFromWatchList(id);
        setData((prev) => {
          const watchlist = prev?.watchlist || [];
          return {
            ...prev,
            watchlist: watchlist.filter((movieId) => movieId !== id),
          };
        });

        return;
      }
      addToWatchList(id);
      setData((prev) => {
        const watchlist = prev?.watchlist || [];
        return { ...prev, watchlist: [...watchlist, id] };
      });
    },
    [id, movieInWatchList, status]
  );

  // const closeModal = () => {
  //   const urlStringParam = updateUrlParam(searchParams, {
  //     type: 'delete',
  //     key: 'watch_modal',
  //   });
  //   router.push(path + '?' + urlStringParam);
  // };
  return (
    <Button
      className={merge(
        `py-2 md:py-4 min-w-max capitalize px-2 md:px-4 rounded-lg flex gap-2 items-center text-sm font-medium group cursor-pointer`,
        border && 'border',
        extraStyles
      )}
      type='button'
      onClick={(e) => {
        e.preventDefault();
        handleClick(id);
      }}
      title='add to watchlist'
    >
      {movieInWatchList ? (
        <Icons.bookmarkCheck className='text-md md:text-xl' />
      ) : (
        <Icons.bookmark className='text-md md:text-xl' />
      )}
      {showText && (movieInWatchList ? 'remove watchlist' : 'add watchlist')}
    </Button>
  );
}
