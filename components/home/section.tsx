import { popularMoviesOptions } from '@/constants/data';
import CustomCarousel from '../Slider/carousel';
import SubHeading from '../common/sub-heading';
import PopularMovieCard from '../Cards/PopularMovieCard';
import MovieCard from '../Cards/MovieCard';
import NewReleaseCard from '../Cards/NewRelease';
import Link from 'next/link';

type SectionProps = {
  title: string;
  variant: string;
  results: MovieList[];
  href: string;
};

export default function Section(props: SectionProps) {
  const { title, variant, results, href } = props;
  return (
    <section className='border-b border-body flex flex-col gap-y-4 last:border-none pt-4'>
      <SubHeading text={title} />
      <CustomCarousel
        options={variant === 'popular' ? popularMoviesOptions : null}
      >
        {results?.map((result, index) => {
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
}
