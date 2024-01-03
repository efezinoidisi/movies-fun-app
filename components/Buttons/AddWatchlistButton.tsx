'use client';
import { useSession } from 'next-auth/react';
import Icons from '@/lib/icons';
import Button from '../Button';
import { addToWatchList, removeFromWatchList } from '@/utils/actions';
import { merge } from '@/utils/merge';
import toast from 'react-hot-toast';
import { useData } from 'app/context/user-favorites';

type Props = {
  movie: MediaItem;
  showText?: boolean;
  border?: boolean;
  extraStyles?: string;
};

export default function AddWatchlistButton(props: Props) {
  const { movie, showText = false, border = false, extraStyles = '' } = props;
  const { watchlist, addWatchlist, removeWatchlist } = useData();

  const { status } = useSession();
  const type = movie?.name ? 'tv' : 'movies';
  const movieInWatchList = watchlist[type].find((film) => film.id === movie.id);

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
    const actionType = movie?.name ? 'tv' : 'movie';
    if (movieInWatchList === undefined) {
      addWatchlist(movie, actionType);
      const res = await addToWatchList(movie);
      if (!res || res?.status === 'error') {
        removeWatchlist(movie, actionType);
        toast.error('failed to add watchlist. Please try again!');
      }
      return;
    }

    removeWatchlist(movie, actionType);
    const res = await removeFromWatchList(movie);
    if (!res || res?.status === 'error') {
      addWatchlist(movie, actionType);
      toast.error('failed to add watchlist. Please try again!');
    }
  };

  return (
    <Button
      className={merge(
        `py-2 md:py-4 min-w-min capitalize px-2 md:px-4 rounded-lg flex gap-2 items-center text-sm font-medium group cursor-pointer h-12`,
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
      {showText && (movieInWatchList ? 'bookmarked' : 'add watchlist')}
    </Button>
  );
}
