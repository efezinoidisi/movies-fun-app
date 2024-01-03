'use client';
import Icons from '@/lib/icons';
import Button from '../Button';
import toast from 'react-hot-toast';
import { addToFavorites, removeFromFavorites } from '@/utils/actions';
import { merge } from '@/utils/merge';
import { useSession } from 'next-auth/react';
import { useData } from 'app/context/user-favorites';

type Position = 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';

export default function Favourite({
  movie,
  position = 'static',
  extraStyles = '',
  showText = false,
}: {
  movie: MediaItem;
  position?: Position;
  extraStyles?: string;
  showText?: boolean;
}) {
  const { favorites, addFavorite, removeFavorite } = useData();
  const { status } = useSession();

  const type = movie.name ? 'tv' : 'movie';

  const isFavorite =
    type === 'tv'
      ? favorites.tv.find((film) => film.id === movie.id)
      : favorites.movies.find((film) => film.id === movie.id);

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

    if (isFavorite === undefined) {
      addFavorite(movie, type);
      const res = await addToFavorites(movie);
      if (!res || res?.status === 'error') {
        removeFavorite(movie, type);
        toast.error('failed to add favourite. Please try again!');
      }
      return;
    }
    removeFavorite(movie, type);
    const res = await removeFromFavorites(movie);
    if (!res || res?.status === 'error') {
      addFavorite(movie, type);
      toast.error('failed to remove favourite. Please try again!');
    }
  };

  return (
    <Button
      className={merge(
        'px-2 group bg-black/20 py-2 rounded-full flex items-center gap-1 capitalize',
        position,
        extraStyles
      )}
      onClick={handleAddtoFavourites}
    >
      {showText && (
        <span className='text-dullText'>
          {isFavorite ? 'liked' : 'add favourite'}
        </span>
      )}

      <Icons.heart
        className={` text-2xl group-hover:text-pink-400 group-active:animate-heart ${
          isFavorite !== undefined ? 'text-pink-500' : 'text-white'
        }`}
      />
    </Button>
  );
}
