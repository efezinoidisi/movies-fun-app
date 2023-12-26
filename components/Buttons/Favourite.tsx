'use client';
import Icons from '@/lib/icons';
import Button from '../Button';
import toast from 'react-hot-toast';
import useUserMoviesData from 'app/context/user-movie-data';
import { addToFavourites, removeFromFavourites } from '@/utils/actions';
import { merge } from '@/utils/merge';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

type Position = 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';

export default function Favourite({
  id,
  position = 'static',
  extraStyles = '',
}: {
  id: number;
  position?: Position;
  extraStyles?: string;
}) {
  const { data, setData } = useUserMoviesData();
  const { status } = useSession();

  const isFavourite = data?.favourites?.includes(id) ?? false;

  const handleAddtoFavourites = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (status === 'unauthenticated') {
        toast.error('please login!', {
          position: 'top-center',
          duration: 5000,
        });
        return;
      }
      if (isFavourite) {
        removeFromFavourites(id);
        setData((prev) => {
          const favourites = prev?.favourites?.filter(
            (movieId) => movieId !== id
          );
          return { ...prev, favourites };
        });
      } else {
        addToFavourites(id);
        setData((prev) => {
          const favourites = prev?.favourites ?? [];
          return { ...prev, favourites: [...favourites, id] };
        });
      }
    },
    [id, isFavourite, status]
  );
  return (
    <Button
      className={merge(
        'px-2 group bg-black/20 py-2 rounded-full',
        position,
        extraStyles
      )}
      onClick={handleAddtoFavourites}
    >
      <Icons.heart
        className={`${
          isFavourite ? 'fill-red-500' : 'fill-white'
        } text-2xl group-hover:fill-red-200 group-active:animate-heart`}
      />
    </Button>
  );
}
