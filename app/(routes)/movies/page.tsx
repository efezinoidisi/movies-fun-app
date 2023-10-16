import Card from '@/components/Cards/Card';
import { fetchList } from '@/utils/fetchList';
import Link from 'next/link';
import List from '@/components/List';

const ENDPOINTS = {
  popular: 'trending/all/week',
  trending: 'trending/movie/day',
  'top-rated': 'movie/top_rated',
  series: 'tv/top_rated',
};

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page as string;
  const type = searchParams?.type as string;

  let endpoint = null;

  // resolve correct endpoint to call
  if (type === 'popular') endpoint = ENDPOINTS.popular;
  else if (type === 'trending') endpoint = ENDPOINTS.trending;
  else if (type === 'series') endpoint = ENDPOINTS.series;
  else endpoint = ENDPOINTS['top-rated'];

  const moviesData: Promise<FetchData> = await fetchList(
    `${endpoint}?page=${page}`
  );

  const { results, page: currentPage, total_pages } = await moviesData;

  const sorted = [...results].sort((a, b) => b.vote_average - a.vote_average);

  return (
    <main className=' px-5 md:px-10'>
      <h2 className='capitalize font-bold'>
        {type === 'top-rated' ? 'top rated' : type}
      </h2>
      <List type={type === 'series' ? 'tv' : 'movie'} list={sorted} />
      <div className='flex justify-between items-center'>
        <Link
          href={{
            pathname: '/movies',
            query: { type, page: Number(page) - 1 },
          }}
          className={`${Number(page) === 1 ? 'invisible' : 'visible'}`}
        >
          prev
        </Link>
        <span>{`page ${page} of ${total_pages}`}</span>
        <Link
          href={{
            pathname: '/movies',
            query: { type, page: Number(page) + 1 },
          }}
          className={`${
            Number(page) === total_pages ? 'invisible' : 'visible'
          }`}
        >
          next
        </Link>
      </div>
    </main>
  );
}
