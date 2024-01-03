import List from '@/components/List/List';
import UserList from '@/components/List/user-list';
import Tab from '@/components/common/tab';
import UserDetails from '@/components/user/details';
import { fetchUserDetails } from '@/utils/actions';

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
  const user = await fetchUserDetails();
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

  const items = {
    'favorite-movies': {
      data: user?.favorites?.movies,
      title: 'favorite movies',
    },
    'favorite-series': {
      data: user?.favorites?.tv,
      title: 'favorite series',
    },
    'watchlist-movies': {
      data: user?.watchlist?.movies,
      title: 'watchlist movies',
    },
    'watchlist-series': {
      data: user?.watchlist?.movies,
      title: 'watchlist series',
    },
  };

  const currentItems = items[tab].data.slice(0, 10);
  const title = items[tab].title;
  return (
    <>
      <div className='py-12'></div>
      <h2 className='capitalize mb-8 font-bold text-center'>account details</h2>
      <section className='grid grid-cols-12 gap-4 px-5 md:px-10 lg:px-16 min-h-[50svh]'>
        <UserDetails username={user.username} email={user.email} id={user.id} />
        <div className='col-span-12 flex flex-col lg:col-span-8 lg:col-start-1 lg:row-start-1 pb-5'>
          <Tab
            tabItems={tabItems}
            defaultTab='favorite-movies'
            styles='col-span-12 md:self-center md:w-fit rounded-md border-white bg-white bg-opacity-90'
            activeStyles='border-accent  text-accent'
          />

          <UserList list={currentItems} title={title} />
        </div>
      </section>{' '}
    </>
  );
}
