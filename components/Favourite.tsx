'use client';
import Button from './Button';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Favourite({ movieId }: { movieId: number }) {
  const { status, data: session } = useSession();
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleAddToFavourites = (id: number) => {
    setIsFavourite((prev) => {
      if (status === 'authenticated') {
        console.log('auth');
        addToFavourites();
      } else {
        console.log('unauth');
      }
      return !prev;
    });
    console.log(session);
  };

  return (
    <Button
      className={`absolute z-50 top-0 right-0 ${
        isFavourite ? 'text-cpink' : 'text-white'
      } pr-3 pt-3`}
      onClick={() => toggleAddToFavourites(movieId)}
    >
      <FaHeart className='text-5xl' />
    </Button>
  );
}

const addToFavourites = () => {};
