'use client';

import Link from 'next/link';
import Logout from '@/components/Buttons/logout';
import { NavSearchInput } from '../Search';
import Icons from '@/lib/icons';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  styles?: string;
};

export default function NavHeader(props: Props) {
  const { styles } = props;
  // const session = await getServerSession(authOptions);

  const { status } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const from = `${pathname}?${searchParams.toString()}`;

  const isLoggedIn = status === 'authenticated';
  return (
    <header
      className={`flex justify-between items-center absolute w-5/6 md:w-11/12 top-9 font-bold md:px-10 lg:px-10 z-50 text-white text-opacity-90 ${styles} capitalize  left-1/2 -translate-x-1/2`}
    >
      {' '}
      <h1 className='font-bold text-xl md:text-2xl'>
        <Link href={'/'}>
          movies
          <span className='uppercase bg-clip-text text-transparent bg-gradient-to-bl from-accent to-white'>
            fun
          </span>
        </Link>
      </h1>
      <div className='flex justify-between items-center gap-3'>
        <NavSearchInput />
        {isLoggedIn ? (
          <>
            <Link
              href={'/profile'}
              className='border rounded-full p-1 hover:border-accent hover:text-accent'
            >
              {' '}
              <Icons.person />
            </Link>
            <Logout />
          </>
        ) : (
          <>
            <Link
              href={{
                pathname: '/signup',
                query: {
                  from,
                },
              }}
              className='bg-white/70 text-black rounded-md px-3 py-1 hover:bg-accent hover:text-white transition-colors ease-linear duration-150 text-sm md:text-base'
            >
              signup
            </Link>
            <Link
              href={{
                pathname: '/login',
                query: {
                  from,
                },
              }}
              className='hover:bg-accent text-white rounded-md px-3 py-1 bg-pink-600 transition-colors ease-linear duration-150 text-sm md:text-base'
            >
              login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
