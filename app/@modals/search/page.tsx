import { Suspense } from 'react';
import Search from '@/components/Search';
import Image from 'next/image';
import { API_BASE_URL, IMG_URL, OPTIONS } from '@/constants/data';
import List from '@/components/List';
import Link from 'next/link';
type Props = {
  searchParams?: { query?: string; page?: string };
};

export default async function page({ searchParams }: Props) {
  const query = searchParams?.query ?? '';
  const page = +(searchParams?.page ?? '1');

  const res = await fetch(
    `${API_BASE_URL}search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: OPTIONS,
    }
  );
  const body = await res.json();

  return (
    <main>
      <div className='inset-0 bg-black opacity-40 fixed z-50'></div>
      <section className='inset-0 fixed z-[100] overflow-y-scroll bg-red-900 w-5/6 mx-auto'>
        <h2>search page</h2>
        {/* <Image src={`${IMG_URL}${url}`} alt='' width={200} height={200} /> */}
        <Suspense fallback={<p>loading</p>}>
          <Search />
        </Suspense>

        {body.results.length > 0 && (
          <section>
            <h3>results</h3>
            <section className='grid gap-10 sl:gap-7 md:gap-5'>
              {body.results.map((result: MovieDetail) => {
                return <SearchCard key={result.id} {...result} />;
              })}
            </section>
          </section>
        )}
      </section>
    </main>
  );
}

type SearchCardProps = MovieDetail & {
  media_type?: 'movie' | 'tv';
};

const SearchCard = (props: SearchCardProps) => {
  const { media_type, overview, title, poster_path, id } = props;
  return (
    <div className='grid md:grid-cols-2 w-4/6 mx-auto'>
      <div className='w-full md:w-52'>
        <Image
          src={`${IMG_URL}${poster_path}`}
          alt={`${title}`}
          width={300}
          height={300}
          className='object-cover'
        />
      </div>

      <div className=''>
        <h4>{title}</h4>
        <p>{overview}</p>
        <p>{media_type}</p>
        <Link href={`/${media_type}/${id}`}>view more</Link>
      </div>
    </div>
  );
};
