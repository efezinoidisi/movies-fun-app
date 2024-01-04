import Link from 'next/link';
import CustomCarousel from '../Slider/carousel';
import NewReleaseCard from '../Cards/NewRelease';
import PopularMovieCard from '../Cards/PopularMovieCard';
import { popularMoviesOptions } from '@/constants/data';
import MovieCard from '../Cards/MovieCard';

export default async function Lists({
  moviesData,
}: {
  moviesData: {
    id: number;
    variant: 'new' | 'popular' | 'movie';
    results: MovieList[];
    href: string;
    title: string;
    type: 'movie' | 'tv';
  }[];
}) {
  return (
    <div className='w-11/12 mx-auto'>
      {moviesData.map(({ id, ...others }) => (
        <Section key={id} {...others} />
      ))}
    </div>
  );
}

type SectionProps = {
  title: string;
  variant: string;
  results: MovieList[];
  href: string;
  type?: 'movie' | 'tv';
};

const Section = (props: SectionProps) => {
  const { title, variant, results, href, type = 'movie' } = props;
  return (
    <section className='border-b border-body flex flex-col gap-y-4 last:border-none pt-4'>
      <h3 className='font-semibold capitalize lg text-2xl text-white'>
        {title}
      </h3>
      <CustomCarousel
        options={variant === 'popular' ? popularMoviesOptions : null}
      >
        {results.map((result, index) => {
          if (variant === 'popular') {
            return (
              <PopularMovieCard index={index} key={result.id} {...result} />
            );
          }

          if (variant === 'movie') {
            return <MovieCard key={result.id} {...result} />;
          }

          return <NewReleaseCard key={result.id} {...result} />;
        })}
      </CustomCarousel>
      <Link
        href={href}
        className='self-end border border-body px-4 py-3 bg-body hover:bg-dull text-dullText'
      >
        view more
      </Link>
    </section>
  );
};
