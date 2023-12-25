import Hero from '@/components/home/hero';
import Lists from '../components/home/Lists';
import { fetchList } from '@/utils/fetchList';
import { getRandomMovies } from '@/utils/helpers';
import Footer from '@/components/Footer';

export default async function Home() {
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
      href: '/movies?type=trending',
      title: 'trending movies',
      type: 'movie',
    },
    {
      id: 1,
      variant: 'popular',
      results: popularResults,
      href: '/movies?type=top-rated',
      title: 'top rated',
      type: 'movie',
    },
    {
      id: 2,
      variant: 'show',
      results: popularResults,
      href: '/movies?type=upcoming',
      title: 'upcoming',
      type: 'movie',
    },
    {
      id: 3,
      variant: 'show',
      results: movies,
      href: '/movies?type=top-rated',
      title: 'top rated movies',
      type: 'movie',
    },

    {
      id: 4,
      variant: 'show',
      results: series,
      href: '/tv?type=top-rated',
      title: 'top rated series',
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
