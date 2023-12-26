import { Suspense } from 'react';
import Search from '@/components/Search';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';
import List from '@/components/List';
import Link from 'next/link';
import { fetchList } from '@/utils/fetchList';
import NewReleaseCard from '@/components/Cards/NewRelease';
import Ring from '@/components/loaders/ring';
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
    <main className='min-h-screen'>
      <div className='py-12 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'></div>
      <section className='flex flex-col gap-3 px-5 md:px-14 lg:px-20 py-5'>
        <h2 className='capitalize text-xl text-center font-semibold tracking-wider'>
          search
        </h2>
        <Suspense fallback={<Ring />}>
          <Search />
        </Suspense>
        {query ? (
          <section className=''>
            <h3 className='pb-7'>{`showing results for "${query}"`}</h3>
            <List list={results} mode='mini' />
            <div className='flex justify-between items-center px-8 md:px-20 py-10'>
              <Link
                href={{
                  pathname: '/search',
                  query: { page: Number(page) - 1, query },
                }}
                className={`${Number(page) === 1 ? 'invisible' : 'visible'}`}
              >
                prev
              </Link>
              <span>{`page ${page} of ${total_pages}`}</span>
              <Link
                href={{
                  pathname: '/search',
                  query: { page: Number(page) + 1, query },
                }}
                className={`${
                  Number(page) === total_pages ? 'invisible' : 'visible'
                }`}
              >
                next
              </Link>
            </div>
          </section>
        ) : (
          <p className='text-center'>search for movie,tv show or persons</p>
        )}
      </section>
    </main>
  );
}
