import Header from '@/components/Header';
import Lists from '../components/home/Lists';
import AnimatedLogos from '../components/home/AnimatedLogos';
import { fetchList } from '@/utils/fetchList';

export default async function Home() {
  const trendingMoviesEndpoint = 'trending/movie/day';

  const moviesData: Promise<FetchData> = fetchList(trendingMoviesEndpoint);

  const { results } = await moviesData;

  const sortedMovies = [...results].sort((a, b) => b.popularity - a.popularity);

  const topFive = sortedMovies.slice(0, 5);

  return (
    <main className={' flex flex-col gap-5'}>
      <Header movies={topFive} />
      <AnimatedLogos />
      <Lists />
    </main>
  );
}
