import MovieCard from './Cards/MovieCard';
import NewReleaseCard from './Cards/NewRelease';

export default function List({
  list,
  type = 'movie',
  mode = 'full',
}: {
  list: MovieList[];
  type?: 'movie' | 'tv' | 'person';
  mode?: 'mini'  | 'full';
}) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sl:grid-cols-2 gap-10 sl:gap-7 md:gap-5'>
      {list.map((movie) => {
        if (movie.media_type === 'person') {
          return null;
        }

        if (mode === 'mini')
          return <NewReleaseCard key={movie.id} {...movie} />;
        return <MovieCard key={movie.id} {...movie} type={type} />;
      })}
    </section>
  );
}
