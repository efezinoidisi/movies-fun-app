import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';
import { Metadata } from 'next';
import Heading from '@/components/common/heading';

export const metadata: Metadata = {
  title: 'Popular celebrities',
  description: 'explore popular, trending, top rated and upcoming movies',
};

export default async function page() {
  const endpoint = `/person/popular`;

  const queryKey = ['person'];
  const queryClient = new QueryClient();
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
        <Heading text='popular celebrities' />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} type='person' />
      </section>
    </HydrationBoundary>
  );
}
