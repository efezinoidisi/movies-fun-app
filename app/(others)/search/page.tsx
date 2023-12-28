import { Suspense } from 'react';
import Search from '@/components/Search';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';
import List from '@/components/List';
import Link from 'next/link';
import { fetchList } from '@/utils/fetchList';
import NewReleaseCard from '@/components/Cards/NewRelease';
import Ring from '@/components/loaders/ring';
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

  if (results?.length === 0) return <p>nothing found</p>;

  return (
    <main className='min-h-screen '>
      <div className='py-12'></div>
      <section className='flex flex-col gap-3 px-5 md:px-14 lg:px-20 py-5'>
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
            <Pagination
              page={page}
              totalPages={total_pages}
              searchParams={searchParams}
            />
          </section>
        ) : (
          <p className='text-center'>search for movie,tv show or person</p>
        )}
      </section>
    </main>
  );
}
