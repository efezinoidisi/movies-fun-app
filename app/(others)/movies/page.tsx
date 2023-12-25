import { fetchList } from '@/utils/fetchList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from '@/components/infinite-scroll/infinite-scroll';

const ENDPOINTS = {
  popular: 'trending/all/week',
  trending: 'trending/movie/day',
  'top-rated': 'movie/top_rated',
};

export default async function page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = (searchParams?.type as string) ?? 'top_rated';

  let endpoint: string = '';

  const date = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(date.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const nextTwoMonths = new Date();
  nextTwoMonths.setMonth(date.getMonth() + 2);

  const maxDate = nextTwoMonths.toISOString().split('T')[0];

  // resolve correct endpoint to call
  if (type === 'top_rated') endpoint = ENDPOINTS.popular;
  else if (type === 'trending') endpoint = ENDPOINTS.trending;
  else
    endpoint = `discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte={maxDate}`;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [`movies-${type}`],
    queryFn: () => fetchList(endpoint),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='py-10 bg-main'></div>
      <main className='px-5 md:px-10 pt-10'>
        <h2 className='capitalize font-bold pb-10'>{`${type} movies`}</h2>
        <InfiniteScroll endpoint={endpoint} key={`movies-${type}`} />
      </main>
    </HydrationBoundary>
  );
}
