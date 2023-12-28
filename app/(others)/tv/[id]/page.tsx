import { fetchList } from '@/utils/fetchList';
import HeroContent from '@/components/common/hero-content';
import {
  checkTrimString,
  getAverage,
  getCountry,
  getLanguage,
  getRuntime,
  getTrailerKey,
} from '@/utils/helpers';
import CarouselWithHeading from '@/components/common/heading-carousel';
import Review from '@/components/common/review';
import Casts from '@/components/common/cast';
import Icons from '@/lib/icons';
import CustomCarousel from '@/components/Slider/carousel';
import MoviePoster from '@/components/common/movie-poster';
import Seasons from '@/components/series/season-card';
import Link from 'next/link';
import Details from '@/components/common/details';
import List from '@/components/List';

type Props = {
  params: { id: string };
};

export default async function page({ params: { id } }: Props) {
  const movieData: Promise<SeriesDetail> = await fetchList(
    `tv/${id}?append_to_response=videos,credits,recommendations,reviews,similar`
  );

  const {
    id: seriesId,
    backdrop_path,
    credits,
    recommendations,
    similar,
    videos,
    name,
    seasons,
    reviews,
    status,
    vote_average,
    genres,
    first_air_date,
    last_air_date,
    overview,
    poster_path,
    number_of_episodes,
    number_of_seasons,
    original_language,
    created_by,
    episode_run_time,
  } = await movieData;

  const trailerKey = getTrailerKey(videos?.results);
  const runtime = getRuntime(episode_run_time[0]);
  const firstAirDate = new Date(first_air_date);
  const lastAirDate = new Date(last_air_date);
  const duration = `${firstAirDate.getFullYear()}-${lastAirDate.getFullYear()}`;

  const language = original_language
    ? await getLanguage(original_language)
    : '';

  const average = getAverage(vote_average);
  const listItems = [
    {
      title: 'more like this',
      movies: similar.results.slice(0, 10),
      link: `/tv/${id}/similar`,
    },
    {
      title: 'recommendations',
      movies: recommendations.results.slice(0, 10),
      link: `/tv/${id}/recommendations`,
    },
  ];

  const filteredSeasons = seasons.filter(
    (season) => season.season_number !== 0
  );

  // const countryString = origin_country.map((country) => {
  //   const str = await getCountry(country);
  //   return str;
  // });

  const creators = created_by?.map((creator) => creator.name).toString();
  return (
    <>
      <HeroContent
        title={name}
        releaseYear={duration}
        trailer={trailerKey as string}
        id={seriesId}
        type={'tv'}
        runtime={null}
        poster={poster_path}
        backdrop={backdrop_path}
      />

      <section className='flex flex-col gap-5 md:gap-7 lg:gap-10 w-4/5 mx-auto'>
        <Details
          name={name}
          type='tv'
          first_episode={first_air_date}
          language={language as string}
          last_episode={last_air_date}
          runtime={runtime}
          overview={overview}
          genres={genres}
          status={status}
          seasons={number_of_seasons}
          episodes={number_of_episodes}
          poster={poster_path}
          creator={creators}
          rating={vote_average}
        />
        <Casts casts={credits.cast} />
        <Seasons seasons={filteredSeasons} />
        <Review
          reviews={reviews.results}
          pages={reviews.total_pages}
          movieId={seriesId}
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
