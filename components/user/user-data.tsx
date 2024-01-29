'use client';
import UserList from '../List/user-list';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loader from '../loaders/loader';
import useList from 'hooks/useList';

type Tab =
  | 'favorite-series'
  | 'favorite-movies'
  | 'watchlist-movies'
  | 'watchlist-series';

const tabItems = [
  {
    query: 'favorite-series',
    title: 'favorite series',
  },
  {
    query: 'favorite-movies',
    title: 'favorite movies',
  },
  {
    query: 'watchlist-series',
    title: 'watchlist tv shows',
  },
  {
    query: 'watchlist-movies',
    title: 'watchlist movies',
  },
];

export default function UserData() {
  const { favorites, watchlist, isError, isFetching } = useList();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const tab: Tab = (searchParams.get('tab') as Tab) ?? 'favorite-movies';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('tab', term);
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // const isFetching = '';

  // const isError = dataStatus === 'error';

  const items = {
    'favorite-movies': {
      data: favorites?.movies,
      title: 'favorite movies',
    },
    'favorite-series': {
      data: favorites?.tv,
      title: 'favorite series',
    },
    'watchlist-movies': {
      data: watchlist?.movies,
      title: 'watchlist movies',
    },
    'watchlist-series': {
      data: watchlist?.tv,
      title: 'watchlist series',
    },
  };
  const currentItems = items[tab]?.data;
  const title = items[tab]?.title;
  return (
    <div className='col-span-12 flex flex-col pb-5 gap-y-10'>
      <div className='flex flex-wrap gap-y-3 gap-x-5'>
        {Object.keys(items)?.map((item) => (
          <div
            key={items[item as Tab].title}
            className='flex items-center bg-dull px-3 py-1 rounded-md'
          >
            <p className='min-w-[12rem]'>{items[item as Tab]?.title}</p>
            <p className='text-black'> {items[item as Tab]?.data?.length}</p>
          </div>
        ))}
      </div>
      <select
        name='tab'
        id='tab'
        defaultValue={tab}
        className='text-white/80  px-3 py-2 rounded-lg outline-none border border-pink-700/50 bg-black/95 w-fit capitalize'
        onChange={handleChange}
        aria-label='select active tab'
      >
        {tabItems?.map((item) => (
          <option key={item.title} value={item.query}>
            {item.title}
          </option>
        ))}
      </select>
      {isFetching ? (
        <Loader background='bg-accent/80' />
      ) : isError ? (
        <p className='text-center'>an error occurred! please try again</p>
      ) : (
        <UserList list={currentItems} title={title} />
      )}
    </div>
  );
}
