import MovieCard from '@/components/Cards/MovieCard';
import CustomCarousel from '@/components/Slider/carousel';

type Props = {
  movies: MovieList[];
  type: 'movie' | 'tv' | 'person';
  title: string;
  id: number;
};

export default function CarouselWithHeading({ movies, title, type }: Props) {
  if (movies.length === 0) return null;

  return (
    <article>
      <h2 className='font-semibold text-xl capitalize pb-10 text-center'>
        {title}
      </h2>
      <CustomCarousel>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </CustomCarousel>
    </article>
  );
}
