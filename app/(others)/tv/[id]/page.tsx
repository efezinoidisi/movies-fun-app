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
    vote_average,
    genres,
    first_air_date,
    last_air_date,
    overview,
    poster_path,
    number_of_episodes,
    number_of_seasons,
    original_language,
    origin_country,
  } = await movieData;

  const trailerKey = getTrailerKey(videos?.results);

  const firstAirDate = new Date(first_air_date);
  const lastAirDate = new Date(last_air_date);
  const duration = `${firstAirDate.getFullYear()}-${lastAirDate.getFullYear()}`;

  const language = await getLanguage(original_language);

  const average = getAverage(vote_average);
  const listItems = [
    {
      id: 0,
      title: 'similar tv shows for you',
      movies: similar.results,
    },
    {
      id: 1,
      title: 'recommended tv shows for you',
      movies: recommendations.results,
    },
  ];

  const director = credits?.crew?.find((crew) => crew.job === 'Director');

  const filteredSeasons = seasons.filter(
    (season) => season.season_number !== 0
  );

  const countryString = origin_country.map((country) => {
    const str = getCountry(country);
    return str;
  });
  console.log(countryString);
  return (
    <main className=''>
      <HeroContent
        title={name}
        genres={genres}
        releaseYear={duration}
        trailer={trailerKey as string}
        id={seriesId}
        type={'tv'}
        runtime={null}
        director={director?.name as string}
        average={average}
        poster={poster_path}
        backdrop={backdrop_path}
      />

      <section className='p-5 sl:px-14 md:py-10 md:px-20 lg:px-36 xl:px-44 flex flex-col gap-10'>
        <div className=''>
          <h3 className='capitalize text-xl font-semibold py-3'>overview</h3>
          <p>{overview}</p>
          <p className='border-y capitalize py-2 flex justify-between items-center min-w-max'>
            <span>seasons: {number_of_seasons}</span>
            <span>language: {language}</span>
          </p>
          <p className='border-b capitalize py-2 flex justify-between items-center min-w-max'>
            <span>episodes: {number_of_episodes}</span>
            <span></span>
          </p>
          <Casts casts={credits.cast} />
          <Seasons seasons={filteredSeasons} />
        </div>
        <Review
          reviews={reviews.results}
          pages={reviews.total_pages}
          movieId={seriesId}
        />

        <>
          {listItems.map((item) => (
            <CarouselWithHeading
              key={item.id}
              {...item}
              type={'tv'}
              id={seriesId}
            />
          ))}
        </>
      </section>
    </main>
  );
}
