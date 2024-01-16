import { Suspense } from 'react';
import Search from '@/components/Search';
import List from '@/components/List/List';
import { fetchList } from '@/utils/fetchList';
import Fallback from '@/components/loaders/fallback';
import Pagination from '@/components/common/pagination';
type Props = {
  searchParams?: { query?: string; page?: string };
};

export default async function page({ searchParams }: Props) {
  const query = searchParams?.query;
  const page = +(searchParams?.page ?? '1');

  const res: Promise<FetchData> = await fetchList(
    `search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
  );

  const { results, total_pages } = await res;

  return (
    <main className='min-h-screen pt-20'>
      <section className='flex flex-col gap-3 w-11/12 mx-auto pt-5 mt-7'>
        <h2 className='capitalize text-xl text-center font-semibold tracking-wider sr-only'>
          search page
        </h2>
        <Suspense fallback={<Fallback />}>
          <Search />
        </Suspense>
        {query ? (
          <section className=''>
            <h3 className='pb-7'>{`showing results for "${query}"`}</h3>
            <List list={results} mode='full' />
            {total_pages > 1 && (
              <Pagination
                page={page}
                totalPages={total_pages}
                searchParams={searchParams}
              />
            )}
          </section>
        ) : (
          <p className='text-center'>search for movie,tv show or person</p>
        )}
        {query && results?.length === 0 && (
          <p className='text-center'>{`no match found for "${query}"`}</p>
        )}
      </section>
    </main>
  );
}
