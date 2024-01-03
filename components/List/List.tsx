import Link from 'next/link';
import MovieCard from '@/components/Cards/MovieCard';
import NewReleaseCard from '@/components/Cards/NewRelease';
import { merge } from '@/utils/merge';
import Person from '@/components/Cards/person';

export default function List({
  list,
  mode = 'full',
  title = '',
  link = '',
  styles = '',
}: {
  list: MovieList[];
  title?: string;
  mode?: 'mini' | 'full';
  link?: string;
  styles?: string;
}) {
  if (list.length === 0) return null;
  return (
    <section className={merge('flex flex-col gap-5', styles)}>
      {title && (
        <h2 className='font-bold capitalize text-lg md:text-2xl text-white'>
          {title}
        </h2>
      )}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 sl:grid-cols-3 gap-2 sl:gap-7 md:gap-5 gap-y-5'>
        {list.map((movie) => {
          if (movie?.media_type === 'person') {
            return (
              <Person
                key={movie.id}
                picture={movie.profile_path}
                name={movie.name}
                id={movie.id}
              />
            );
          }

          if (mode === 'mini')
            return <NewReleaseCard key={movie.id} {...movie} />;
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
      {link ? (
        <Link
          href={link}
          className='self-end border border-body px-4 py-3 bg-body hover:bg-dull text-dullText'
        >
          view more
        </Link>
      ) : null}
    </section>
  );
}
