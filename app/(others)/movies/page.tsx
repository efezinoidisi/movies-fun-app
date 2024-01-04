import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';
import { MOVIE_ENDPOINTS } from '@/constants/data';
import Tab from '@/components/common/tab';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'explore popular, trending, top rated and upcoming movies',
};

type Tab = 'top_rated' | 'upcoming' | 'popular' | 'trending';

const tabList = [
  {
    query: 'top_rated',
    title: 'top-rated',
  },
  {
    query: 'upcoming',
    title: 'upcoming',
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

  const endpoint = MOVIE_ENDPOINTS[tab];

  const queryClient = new QueryClient();

  const queryKey = ['movies', tab];

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
      <div className='py-10 bg-[#0e2439]'></div>
      <section className='w-11/12 mx-auto pt-10  flex flex-col gap-5'>
        <h2 className='capitalize font-bold pb-5 text-center text-xl text-white'>{`${tab.replace(
          '_',
          ' '
        )} movies`}</h2>

        <Tab
          tabItems={tabList}
          defaultTab='top_rated'
          styles='self-center md:self-end rounded-md border-white bg-white bg-opacity-90'
          activeStyles='border-accent  text-accent'
        />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
