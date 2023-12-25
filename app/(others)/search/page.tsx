import { Suspense } from 'react';
import Search from '@/components/Search';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';
import List from '@/components/List';
import Link from 'next/link';
import { fetchList } from '@/utils/fetchList';
import NewReleaseCard from '@/components/Cards/NewRelease';
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
      <div className='py-10 bg-black'></div>
      <section className='flex flex-col gap-3'>
        <h2>search page</h2>
        <Suspense fallback={<p>loading</p>}>
          <Search />
        </Suspense>
        {query ? (
          <section>
            <h3>{`showing results for "${query}"`}</h3>
            <List list={results} mode='mini' />
            <div className='flex justify-between items-center'>
              <Link
                href={{
                  pathname: '/movies',
                  query: { page: Number(page) - 1 },
                }}
                className={`${Number(page) === 1 ? 'invisible' : 'visible'}`}
              >
                prev
              </Link>
              <span>{`page ${page} of ${total_pages}`}</span>
              <Link
                href={{
                  pathname: '/movies',
                  query: { page: Number(page) + 1 },
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
