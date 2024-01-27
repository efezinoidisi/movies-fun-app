import Hero from '@/components/home/hero';
import Lists from '../components/home/Lists';
import { fetchList } from '@/utils/fetchList';
import { getRandomMovies } from '@/utils/helpers';
import Footer from '@/components/Footer';
import List from '@/components/List/List';

export default async function Home() {
  const trendingMoviesEndpoint = 'trending/movie/day';
  const popularEndpoint = 'movie/popular';
  const moviesEndpoint = 'movie/upcoming';
  const seriesEndpoint = 'tv/popular';
  const trendingSeriesEndpoint = 'trending/tv/day';


  const allResults: Promise<
    [FetchData, FetchData, FetchData, FetchData, FetchData]
  > = Promise.all([
    fetchList(seriesEndpoint),
    fetchList(moviesEndpoint),
    fetchList(trendingMoviesEndpoint),
    fetchList(popularEndpoint),
    fetchList(trendingSeriesEndpoint),
  ]);

  const [
    { results: series },
    { results: movies },
    { results: trendingResults },
    { results: popularResults },
    { results: trendingSeries },
  ] = await allResults;

  series.sort((a, b) => b.popularity - a.popularity);

  popularResults.sort((a, b) => b.popularity - a.popularity);
  const allData: {
    id: number;
    variant: 'new' | 'popular' | 'movie';
    results: MovieList[];
    href: string;
    title: string;
    type: 'movie' | 'tv';
  }[] = [
    {
      id: 3,
      variant: 'new',
      results: trendingSeries,
      href: '/tv?tab=trending',
      title: 'trending tv shows',
      type: 'tv',
    },
    {
      id: 1,
      variant: 'popular',
      results: popularResults,
      href: '/movies?tab=popular',
      title: 'popular movies',
      type: 'movie',
    },
    {
      id: 2,
      variant: 'movie',
      results: series,
      href: '/tv?tab=popular',
      title: 'popular tv shows',
      type: 'tv',
    },
    {
      id: 0,
      variant: 'new',
      results: movies,
      href: '/movies?tab=upcoming',
      title: 'upcoming movies',
      type: 'movie',
    },
  ];

  const randomFive = getRandomMovies(trendingResults, 5);
  return (
    <>
      <section className={' flex flex-col gap-y-5'}>
        <Hero movies={randomFive} />
        <List
          list={trendingResults.slice(0, 10)}
          link='/movies?tab=trending'
          title='trending movies'
          styles=' w-11/12 mx-auto border-b mt-10 border-body'
        />
        <Lists moviesData={allData} />
      </section>
      <Footer />
    </>
  );
}
