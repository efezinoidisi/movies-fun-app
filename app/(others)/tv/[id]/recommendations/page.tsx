import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';

type Props = {
  params: { id: string };
};

export default async function page(props: Props) {
  const {
    params: { id },
  } = props;

  const endpoint = `/tv/${id}/recommendations`;

  const queryKey = ['tv', id, 'recommendations'];
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
      <section className='px-5 md:px-10 pt-10  flex flex-col gap-5'>
        <h2 className='capitalize font-bold pb-5 text-center text-xl text-white'>
          recommendations
        </h2>
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
