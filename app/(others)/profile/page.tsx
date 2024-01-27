import Heading from '@/components/common/heading';
import Tab from '@/components/common/tab';
import Fallback from '@/components/loaders/fallback';
import UserDetails from '@/components/user/details';
import UserData from '@/components/user/user-data';
import authOptions from 'config/authOptions';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

type Tab =
  | 'favorite-series'
  | 'favorite-movies'
  | 'watchlist-movies'
  | 'watchlist-series';

export default async function Page({
  searchParams,
}: {
  searchParams: { tab: Tab };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const tab = searchParams?.tab ?? 'favorite-movies';
  const tabItems = [
    {
      query: 'favorite-series',
      title: '❤series',
    },
    {
      query: 'favorite-movies',
      title: '❤movies',
    },
    {
      query: 'watchlist-series',
      title: '📜series',
    },
    {
      query: 'watchlist-movies',
      title: '📜movies',
    },
  ];

  return (
    <>
      <div className='py-12'></div>
      <Heading text='account details' styles='md:text-center' />
      <section className='grid grid-cols-12 gap-4 w-11/12 mx-auto min-h-[50svh]'>
        <UserDetails
          username={user?.username ?? ''}
          email={user?.email ?? ''}
          id={user?.id ?? ''}
        />
        <Suspense fallback={<Fallback />}>
          <UserData />
        </Suspense>{' '}
      </section>{' '}
    </>
  );
}
