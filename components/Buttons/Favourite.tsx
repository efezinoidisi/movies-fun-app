'use client';
import Icons from '@/lib/icons';
import Button from '../Button';
import toast from 'react-hot-toast';
import useUserMoviesData from 'app/context/user-movie-data';
import { addToFavourites, removeFromFavourites } from '@/utils/actions';
import { merge } from '@/utils/merge';

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

  const isFavourite = data?.favourites?.includes(id) ?? false;
  const handleAddtoFavourites = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (isFavourite) {
      await removeFromFavourites(id);
      setData((prev) => {
        const favourites = prev?.favourites?.filter(
          (movieId) => movieId !== id
        );
        return { ...prev, favourites };
      });
    } else {
      await addToFavourites(id);
      setData((prev) => {
        const favourites = prev?.favourites ?? [];
        return { ...prev, favourites: [...favourites, id] };
      });
    }
  };
  return (
    <Button
      className={merge('px-2', position, extraStyles)}
      onClick={handleAddtoFavourites}
    >
      <Icons.heart
        className={`${
          isFavourite ? 'fill-red-500' : ''
        } text-2xl group-hover:fill-red-200 `}
      />
    </Button>
  );
}
