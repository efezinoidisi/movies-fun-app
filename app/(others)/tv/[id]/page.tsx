import { fetchList } from '@/utils/fetchList';
import HeroContent from '@/components/common/hero-content';
import {
  getLanguage,
  getReleaseDate,
  getRuntime,
  getTrailerKey,
} from '@/utils/helpers';
import Review from '@/components/common/review';
import Casts from '@/components/common/cast';
import Seasons from '@/components/series/season-card';
import Details from '@/components/common/details';
import List from '@/components/List/List';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  const show = await fetchList(`tv/${id}`);

  return {
    title: `${show?.name}`,
    description: show?.overview,
  };
}

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

  const firstYear = getReleaseDate(first_air_date, 'short');
  const lastYear = getReleaseDate(last_air_date, 'short');
  const duration =
    firstYear === lastYear ? `${firstYear}` : `${firstYear}-${lastYear}`;

  const language = original_language
    ? await getLanguage(original_language)
    : '';

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

  const genre_ids = genres.map((genre) => genre.id);

  const payload: MediaItem = {
    id: seriesId,
    backdrop_path,
    genre_ids,
    title: '',
    vote_average,
    name,
  };

  const creators = created_by?.map((creator) => creator.name).toString();
  return (
    <>
      <HeroContent
        payload={payload}
        releaseYear={duration}
        trailer={trailerKey as string}
        type={'tv'}
        runtime={runtime}
        poster={poster_path}
      />

      <section className='flex flex-col gap-5 md:gap-7 lg:gap-10 w-11/12 mx-auto'>
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
          payload={payload}
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
