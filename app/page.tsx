import Hero from '@/components/home/hero';
import Lists from '../components/home/Lists';
import { fetchList } from '@/utils/fetchList';
import { getRandomMovies } from '@/utils/helpers';
import Footer from '@/components/Footer';
import List from '@/components/List/List';
import Section from '@/components/home/section';

export const revalidate = 86400; // revalidate after 24 hours(1 day)

export default async function Home() {
  const trendingMoviesEndpoint = 'trending/movie/day';
  const popularEndpoint = 'movie/popular';

  const allResults: Promise<[FetchData, FetchData]> = Promise.all([
    fetchList(trendingMoviesEndpoint),
    fetchList(popularEndpoint),
  ]);

  const [{ results: trendingResults }, { results: popularResults }] =
    await allResults;

  trendingResults.sort((a, b) => b.popularity - a.popularity);

  popularResults.sort((a, b) => b.popularity - a.popularity);

  const randomFive = getRandomMovies(trendingResults, 5);
  return (
    <>
      <Hero movies={randomFive} />
      <section
        className={
          ' flex flex-col gap-y-5 w-11/12 mx-auto border-b mt-10 border-body'
        }
      >
        <List
          list={trendingResults}
          link='/movies?tab=trending'
          title='trending movies'
          styles=' '
        />
        <Section
          title='popular movies'
          variant='popular'
          results={popularResults}
          href='/movies?tab=popular'
        />
        <Lists />
      </section>
      <Footer />
    </>
  );
}
