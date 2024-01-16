import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';
import Heading from '@/components/common/heading';

type Props = {
  params: { movieId: string };
};

export async function generateMetadata({ params: { movieId } }: Props) {
  const movie = await fetchList(`movie/${movieId}`);

  return {
    title: `MoviesFun - Recommendations`,
    description: `movie recommendations based on ${movie.title}`,
  };
}

export default async function page(props: Props) {
  const {
    params: { movieId },
  } = props;

  const endpoint = `/movie/${movieId}/recommendations`;

  const queryKey = ['movies', movieId, 'recommendations'];
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
        <Heading text='recommendations' />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
