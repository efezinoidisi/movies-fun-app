import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';
import Heading from '@/components/common/heading';

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
      <div className="py-10"></div>
      <section className="px-5 md:px-10 lg:px-16 pt-10  flex flex-col gap-5">
        <Heading text="recommendations" />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
