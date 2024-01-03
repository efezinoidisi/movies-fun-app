import { fetchList } from '@/utils/fetchList';
import HeroContent from '@/components/common/hero-content';
import {
  getAverage,
  getLanguage,
  getRuntime,
  getTrailerKey,
  numberToDollarString,
} from '@/utils/helpers';
import CarouselWithHeading from '@/components/common/heading-carousel';
import Review from '@/components/common/review';
import Casts from '@/components/common/cast';
import Details from '@/components/common/details';
import MovieCard from '@/components/Cards/MovieCard';
import List from '@/components/List/List';
import Favourite from '@/components/Buttons/Favourite';

type Props = {
  params: { movieId: string };
};

export async function generateMetadata({ params: { movieId } }: Props) {
  const movie = await fetchList(`movie/${movieId}`);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function page({ params: { movieId } }: Props) {
  const movieData: Promise<MovieDetail> = await fetchList(
    `movie/${movieId}?append_to_response=videos,images,credits,recommendations,reviews,similar`
  );
  const {
    id,
    backdrop_path,
    credits,
    recommendations,
    similar,
    videos,
    title,
    reviews,
    release_date,
    genres,
    overview,
    runtime,
    vote_average,
    poster_path,
    original_language,
    budget,
    revenue,
    images,
  } = await movieData;

  const date = new Date(release_date);

  const releaseYear = release_date ? `${date.getFullYear()}` : null;

  const trailerKey = getTrailerKey(videos.results);

  const listItems = [
    {
      title: 'more like this',
      movies: similar.results.slice(0, 10),
      link: `/movies/${id}/similar`,
    },
    {
      title: 'recommendations',
      movies: recommendations.results.slice(0, 10),
      link: `/movies/${id}/recommendations`,
    },
  ];

  const displayedRuntime = runtime > 0 ? getRuntime(runtime) : null;

  const director = credits.crew.find((crew) => crew.job === 'Director');

  const language = await getLanguage(original_language);
  const genre_ids = genres.map((genre) => genre.id);
  const payload: MediaItem = {
    id,
    backdrop_path,
    genre_ids,
    title,
    vote_average,
    name: '',
  };

  return (
    <>
      <HeroContent
        releaseYear={releaseYear}
        trailer={trailerKey as string}
        payload={payload}
        type={'movie'}
        runtime={displayedRuntime}
        poster={poster_path}
      />

      <Favourite
        movie={payload}
        showText
        position='relative'
        extraStyles='bg-dull w-fit ml-auto mt-3 rounded-lg hover:border hover:border-pink-600'
      />

      <section className=' flex flex-col gap-5 md:gap-7 lg:gap-10 w-4/5 mx-auto mb-5  pb-5'>
        <Details
          type='movie'
          name={title}
          runtime={displayedRuntime as string}
          language={language || ''}
          director={director?.name as string}
          overview={overview}
          genres={genres}
          poster={poster_path}
          rating={vote_average}
          release={release_date}
          budget={budget}
          revenue={revenue}
        />
        <Casts casts={credits.cast} />

        <Review
          reviews={reviews.results}
          pages={reviews.total_pages}
          movieId={id}
        />

        <>
          {listItems.map((item) => (
            <List
              list={item.movies}
              title={item.title}
              link={item.link}
              key={item.title}
            />
          ))}
        </>
      </section>
    </>
  );
}
