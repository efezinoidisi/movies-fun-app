import { Suspense } from 'react';
import Search from '@/components/Search';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';
import List from '@/components/List/List';
import Link from 'next/link';
import { fetchList } from '@/utils/fetchList';
import NewReleaseCard from '@/components/Cards/NewRelease';
import Ring from '@/components/loaders/ring';
import Pagination from '@/components/common/pagination';
import { pages } from 'next/dist/build/templates/app-page';
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
      <section className='flex flex-col gap-3 px-5 md:px-14 lg:px-20 pt-5'>
        <h2 className='capitalize text-xl text-center font-semibold tracking-wider sr-only'>
          search page
        </h2>
        <Suspense fallback={<Ring />}>
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
          <p className='text-center'>empty search result...</p>
        )}
      </section>
    </main>
  );
}
