import { fetchList } from '@/utils/fetchList';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Genres',
  description: 'explore all movies and tv show genres',
};

export default async function page() {
  const movieGenresEndpoint = 'genre/movie/list';
  const tvGenresEndpoint = 'genre/tv/list';

  const allData: Promise<[{ genres: Genre[] }, { genres: Genre[] }]> =
    Promise.all([fetchList(movieGenresEndpoint), fetchList(tvGenresEndpoint)]);

  const [{ genres: movieGenres }, { genres: tvGenres }] = await allData;

  return (
    <section className='w-11/12 mx-auto pb-10'>
      <div className='py-12'></div>
      <h2 className='sr-only'>genres</h2>
      <div className='grid grid-cols-2 place-items-start justify-items-center gap-5'>
        <div className='flex flex-col gap-5 border-r border-body items-center pr-5 md:border-none'>
          <h3 className='text-white capitalize'>movie genres</h3>
          <Genre genres={movieGenres} type='movies' />
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <h3 className='text-white capitalize'>tv genres</h3>
          <Genre genres={tvGenres} type='tv' />
        </div>
      </div>
    </section>
  );
}

const Genre = ({
  genres,
  type,
}: {
  genres: Genre[];
  type: 'tv' | 'movies';
}) => {
  const content = genres?.map(({ id, name }) => (
    <li
      key={id}
      className='text-center md:text-left px-2 py-2 hover:bg-dull w-fit rounded-lg hover:text-accent transition-colors duration-200 ease-in-out'
    >
      <Link
        href={`/${type}/genre/${id}`}
        className='underline'
        prefetch={false}
      >
        {name}
      </Link>
    </li>
  ));

  return <ul className=''>{content}</ul>;
};
