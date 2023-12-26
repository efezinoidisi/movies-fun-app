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

type Props = {
  params: { movieId: string };
};

export default async function page({ params: { movieId } }: Props) {
  const movieData: Promise<MovieDetail> = await fetchList(
    `movie/${movieId}?append_to_response=videos,credits,recommendations,reviews,similar`
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
  } = await movieData;

  const date = new Date(release_date);

  const releaseYear = release_date ? `${date.getFullYear()}` : null;
  const releaseDate = date.toLocaleDateString('en-Us', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  });
  const trailerKey = getTrailerKey(videos.results);

  const average = getAverage(vote_average);

  const listItems = [
    {
      id: 0,
      title: 'similar movies for you',
      movies: similar.results,
    },
    {
      id: 1,
      title: 'recommended movies for you',
      movies: recommendations.results,
    },
  ];

  const displayedRuntime = runtime > 0 ? getRuntime(runtime) : null;

  const director = credits.crew.find((crew) => crew.job === 'Director');

  const language = await getLanguage(original_language);

  const budgetStr = budget ? numberToDollarString(budget) : '';
  const revenueStr = revenue ? numberToDollarString(revenue) : '';

  return (
    <main className=''>
      <HeroContent
        title={title}
        genres={genres}
        releaseYear={releaseYear}
        trailer={trailerKey as string}
        id={id}
        type={'movie'}
        runtime={displayedRuntime}
        director={director?.name as string}
        average={average}
        poster={poster_path}
        backdrop={backdrop_path}
      />

      <section className='p-5 sl:px-14 md:py-10 md:px-20 lg:px-36 xl:px-44 flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <h3 className='capitalize text-xl font-semibold'>overview</h3>
          <p>{overview}</p>
          <p className='capitalize border-y py-3 flex md:items-center justify-between flex-col  md:flex-row gap-2'>
            <span>release date: {releaseDate}</span>
            <span>Language: {language}</span>
          </p>
          {(budgetStr || revenueStr) && (
            <p className='capitalize border-b py-3 flex flex-col  md:flex-row gap-2 md:items-center justify-between'>
              <span>{budgetStr && `budget: ${budgetStr}`}</span>
              <span>{revenueStr && `revenue: ${revenueStr}`}</span>
            </p>
          )}
        </div>
        <Casts casts={credits.cast} />

        <Review
          reviews={reviews.results}
          pages={reviews.total_pages}
          movieId={id}
        />

        <>
          {listItems.map((item) => (
            <CarouselWithHeading
              key={item.id}
              {...item}
              type={'movie'}
              id={id}
            />
          ))}
        </>
      </section>
    </main>
  );
}
