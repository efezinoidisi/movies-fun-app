import Carousel from '@/components/Slider/Slider';
import { fetchList } from '@/utils/fetchList';
import Link from 'next/link';

export default async function Lists() {
  // endpoints
  const trendingMoviesEndpoint = 'trending/movie/day';
  const popularEndpoint = 'trending/all/week';
  const moviesEndpoint = 'movie/top_rated';
  const seriesEndpoint = 'tv/top_rated';

  const popularMoviesData: Promise<FetchData> = fetchList(popularEndpoint);

  const trendingMoviesData: Promise<FetchData> = fetchList(
    trendingMoviesEndpoint
  );

  const moviesData: Promise<FetchData> = fetchList(moviesEndpoint);
  const seriesData: Promise<FetchData> = fetchList(seriesEndpoint);

  const [
    { results: popularResults },
    { results: trendingResults },
    { results: movies },
    { results: series },
  ] = await Promise.all([
    popularMoviesData,
    trendingMoviesData,
    moviesData,
    seriesData,
  ]);

  const allData: {
    id: number;
    variant: 'new' | 'show' | 'popular';
    results: MovieList[];
    href: string;
    title: string;
    type: 'movie' | 'tv';
  }[] = [
    {
      id: 0,
      variant: 'new',
      results: trendingResults,
      href: '/movies?type=trending&page=1',
      title: 'trending movies',
      type: 'movie',
    },
    {
      id: 1,
      variant: 'popular',
      results: popularResults,
      href: '/movies?type=popular&page=1',
      title: 'popular this week',
      type: 'movie',
    },
    {
      id: 2,
      variant: 'show',
      results: movies,
      href: '/movies?type=top-rated&page=1',
      title: 'movies',
      type: 'movie',
    },

    {
      id: 3,
      variant: 'show',
      results: series,
      href: '/movies?type=series&page=1',
      title: 'series',
      type: 'tv',
    },
  ];

  return (
    <section className='px-5 md:px-20 flex flex-col gap-7 pb-10'>
      {allData.map(({ id, ...others }) => (
        <Section key={id} {...others} />
      ))}
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
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold capitalize py-3 text-2xl'>{title}</h2>
        <Link href={href}>see more...</Link>
      </div>
      <Carousel variant={variant} slideItems={results} type={type} />
    </>
  );
};
