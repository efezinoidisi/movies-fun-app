'use client';
import { useSession } from 'next-auth/react';
import Icons from '@/lib/icons';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ModalWrapper from '../modals/ModalWrapper';
import Link from 'next/link';
import { updateUrlParam } from '@/utils/helpers';
import { Suspense } from 'react';
import Button from '../Button';
import { addToWatchList, removeFromWatchList } from '@/utils/actions';
import useUserMoviesData from '../../app/context/user-movie-data';
import { merge } from '@/utils/merge';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleClick = async (id: number) => {
    if (status === 'unauthenticated') {
      const urlStringParam = updateUrlParam(searchParams, {
        type: 'update',
        key: 'watch_modal',
        value: 'true',
      });
      router.push(path + '?' + urlStringParam);
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
  };

  const showModal = searchParams.get('watch_modal');

  const closeModal = () => {
    const urlStringParam = updateUrlParam(searchParams, {
      type: 'delete',
      key: 'watch_modal',
    });
    router.push(path + '?' + urlStringParam);
  };
  const movieInWatchList = data?.watchlist?.includes(id) ?? false;
  return (
    <>
      <Button
        className={merge(
          `py-2 md:py-3 md:text-lg capitalize px-2 rounded-lg flex gap-2 items-center text-sm font-medium group cursor-pointer`,
          border && 'border md:px-8',
          extraStyles
        )}
        type='button'
        onClick={(e) => {
          e.preventDefault();
          console.log('bookmark');
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
      <Suspense fallback={<p>loading</p>}>
        {showModal && (
          <ModalWrapper closeModal={closeModal}>
            <p>please login to add movie to your watchlist</p>
            <Link href={'/login'} className='login-btn'>
              login
            </Link>
          </ModalWrapper>
        )}
      </Suspense>
    </>
  );
}
