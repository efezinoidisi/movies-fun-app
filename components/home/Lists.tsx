import Link from 'next/link';
import Card from '../Cards/Card';
import CustomCarousel from '../Slider/carousel';
import NewReleaseCard from '../Cards/NewRelease';
import PopularMovieCard from '../Cards/PopularMovieCard';
import { popularMoviesOptions } from '@/constants/data';

export default async function Lists({
  moviesData,
}: {
  moviesData: {
    id: number;
    variant: 'new' | 'show' | 'popular';
    results: MovieList[];
    href: string;
    title: string;
    type: 'movie' | 'tv';
  }[];
}) {
  return (
    <section className='px-5 md:px-20 flex flex-col gap-1 pb-10'>
      {moviesData.map(({ id, ...others }) => (
        <Section key={id} {...others} />
      ))}
      {/* <InfiniteScroll
        endpoint='trending/movie/day'
        key='trending'
        pageTitle='infinite scrolling'
      /> */}
    </section>
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
    <section className='border-b border-main py-5 lg:py-10 flex flex-col gap-4 border-opacity-40 last:border-none'>
      <h2 className='font-semibold capitalize lg text-2xl'>{title}</h2>
      <CustomCarousel
        options={variant === 'popular' ? popularMoviesOptions : null}
      >
        {results.map((result, index) => {
          if (variant === 'new') {
            return <NewReleaseCard key={result.id} {...result} />;
          }
          if (variant === 'popular') {
            return (
              <PopularMovieCard index={index} key={result.id} {...result} />
            );
          }
          return <Card key={result.id} {...result} type={type} />;
        })}
      </CustomCarousel>
      <Link
        href={href}
        className='hover:scale-110 transition-transform duration-150 ease-out self-end'
      >
        view all...
      </Link>
    </section>
  );
};
