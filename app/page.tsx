import Header from '@/components/Header';
import Lists from '../components/home/Lists';
import AnimatedLogos from '../components/home/AnimatedLogos';
import { fetchList } from '@/utils/fetchList';
import { getRandomMovies } from '@/utils/helpers';

export default async function Home() {
  const trendingMoviesEndpoint = 'trending/movie/day';

  const moviesData: Promise<FetchData> = fetchList(trendingMoviesEndpoint);

  const { results } = await moviesData;
  const randomFive = getRandomMovies(results, 5);
  return (
    <main className={' flex flex-col gap-5'}>
      <Header movies={randomFive} />
      {/* <AnimatedLogos /> */}
      <Lists />
    </main>
  );
}
