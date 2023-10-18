'use client';
import { useSession } from 'next-auth/react';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ModalWrapper from '../modals/ModalWrapper';
import Link from 'next/link';
import { updateUrlParam } from '@/utils/helpers';
import { Suspense } from 'react';

type Props = {
  id: number;
};

export default function AddWatchlistButton(props: Props) {
  const { id } = props;
  const { status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const addToWatchList = async (id: number) => {
    if (status === 'unauthenticated') {
      const urlStringParam = updateUrlParam(searchParams, {
        type: 'update',
        key: 'watch_modal',
        value: 'true',
      });
      router.push(path + '?' + urlStringParam);
    } else {
      console.log('auth');
    }
  };

  const showModal = searchParams.get('watch_modal');

  const closeModal = () => {
    const urlStringParam = updateUrlParam(searchParams, {
      type: 'delete',
      key: 'watch_modal',
    });
    router.push(path + '?' + urlStringParam);
  };

  return (
    <>
      <button
        className='py-2 md:py-3 md:text-lg capitalize px-2 md:px-7 rounded-lg flex gap-2 items-center border text-sm font-medium'
        type='button'
        onClick={() => addToWatchList(id)}
      >
        <BsFillBookmarkFill className='text-md md:text-xl' />
        add watchlist
      </button>
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
