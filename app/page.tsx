import Hero from '@/components/home/hero';
import Lists from '../components/home/Lists';
import { fetchList } from '@/utils/fetchList';
import { getRandomMovies } from '@/utils/helpers';
import Footer from '@/components/Footer';

export default async function Home() {
  const trendingMoviesEndpoint = 'trending/movie/day';
  const popularEndpoint = 'movie/popular';
  const moviesEndpoint = 'movie/upcoming';
  const seriesEndpoint = 'tv/popular';
  const trendingSeriesEndpoint = 'trending/tv/day';

  const popularMoviesData: Promise<FetchData> = fetchList(popularEndpoint);

  const trendingMoviesData: Promise<FetchData> = fetchList(
    trendingMoviesEndpoint
  );

  const moviesData: Promise<FetchData> = fetchList(moviesEndpoint);
  const seriesData: Promise<FetchData> = fetchList(seriesEndpoint);

  const trendingSeriesData: Promise<FetchData> = fetchList(
    trendingSeriesEndpoint
  );

  const [
    { results: popularResults },
    { results: trendingResults },
    { results: movies },
    { results: series },
    { results: trendingSeries },
  ] = await Promise.all([
    popularMoviesData,
    trendingMoviesData,
    moviesData,
    seriesData,
    trendingSeriesData,
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
      href: '/movies?tab=trending',
      title: 'trending movies',
      type: 'movie',
    },
    {
      id: 1,
      variant: 'popular',
      results: popularResults,
      href: '/movies?tab=popular',
      title: 'popular',
      type: 'movie',
    },
    {
      id: 2,
      variant: 'show',
      results: movies,
      href: '/movies?tab=upcoming',
      title: 'upcoming',
      type: 'movie',
    },
    {
      id: 3,
      variant: 'popular',
      results: series,
      href: '/tv?tab=popular',
      title: 'popular tv shows',
      type: 'tv',
    },
    {
      id: 4,
      variant: 'show',
      results: trendingSeries,
      href: '/tv?tab=trending',
      title: 'trending tv shows',
      type: 'tv',
    },
  ];
  const { results } = await moviesData;
  const randomFive = getRandomMovies(results, 5);
  return (
    <>
      <main className={' flex flex-col '}>
        <Hero movies={randomFive} />
        <Lists moviesData={allData} />
      </main>
      <Footer />
    </>
  );
}
