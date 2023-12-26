import { fetchList } from '@/utils/fetchList';
import Link from 'next/link';
import List from '@/components/List';
import { TV_ENDPOINTS } from '@/constants/data';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Tab from '@/components/common/tab';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';

type Tab = 'top_rated' | 'popular' | 'trending';

const tabList = [
  {
    query: 'top_rated',
    title: 'top-rated',
  },
  {
    query: 'trending',
    title: 'trending',
  },
  {
    query: 'popular',
    title: 'popular',
  },
];

export default async function page({
  searchParams,
}: {
  searchParams: { tab: Tab };
}) {
  const { tab = 'top_rated' } = searchParams;

  const endpoint = TV_ENDPOINTS[tab];

  const queryClient = new QueryClient();

  const queryKey = ['tv', tab];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: () => fetchList(endpoint),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
    pages: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='py-12 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'></div>
      <main className='px-5 md:px-10 pt-10 flex flex-col gap-5'>
        <h2 className='capitalize font-bold pb-5'>{`${tab.replace(
          '_',
          ' '
        )} tv shows`}</h2>

        <Tab
          tabItems={tabList}
          defaultTab='top_rated'
          styles='self-end rounded-md border-white bg-white sticky top-7 bg-opacity-80 z-50'
          activeStyles='border-accent  text-accent'
        />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} type='tv' />
      </main>
    </HydrationBoundary>
  );
}