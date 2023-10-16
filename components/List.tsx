import MovieCard from './Cards/MovieCard';

export default function List({
  list,
  type = 'movie',
}: {
  list: MovieList[];
  type?: 'movie' | 'tv';
}) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sl:grid-cols-2 gap-10 sl:gap-7 md:gap-5'>
      {list.map((movie) => {
        return <MovieCard key={movie.id} {...movie} type={type} />;
      })}
    </section>
  );
}
