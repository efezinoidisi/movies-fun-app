import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';
import { GENRES } from '@/constants/data';
import Error from '@/components/error/error';

type Props = {
  params: { id: string };
};

export default async function page(props: Props) {
  const {
    params: { id },
  } = props;

  const endpoint = `discover/tv?with_genres=${id}`;

  const queryKey = ['tv', 'genre', id];

  const isIdValid = Object.keys(GENRES).includes(id);

  if (!isIdValid) return <Error message='genre not found' />;

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

  const text = GENRES[+id] ?? '';

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='py-10 bg-[#0e2439]'></div>
      <section className='w-11/12 mx-auto pt-10  flex flex-col gap-5'>
        <h2 className='capitalize font-bold pb-5 text-center text-xl text-white'>
          {text}
        </h2>
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
