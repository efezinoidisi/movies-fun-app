import { IMG_URL } from '@/constants/data';
import { fetchList } from '@/utils/fetchList';
import HeaderContent from './components/HeaderContent';
import { getTrailerKey } from '@/utils/helpers';
import TitleCard from './components/TitleCard';
import Ratings from './components/Ratings';
import ImageWithPlaceholder from '@/components/ImageWithPlaceholder';

type Props = {
  params: { movieId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({
  params: { movieId },
  searchParams,
}: Props) {
  const type = (searchParams?.type as string) ?? 'movie';
  const movieData: Promise<MovieDetail> = await fetchList(
    `${type}/${movieId}?append_to_response=videos,credits,recommendations,reviews,similar`
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
    first_air_date,
    last_air_date,
    overview,
  } = await movieData;

  const { cast } = credits;

  const date = new Date(release_date);
  const releaseYear = `${date.getFullYear()}`;

  const trailerKey = getTrailerKey(videos.results);

  const firstAirDate = new Date(first_air_date);
  const lastAirDate = new Date(last_air_date);
  const duration = `${firstAirDate.getFullYear()} - ${lastAirDate.getFullYear()}`;

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

  return (
    <main className=''>
      <header
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className='relative header text-white h-[70vh] flex flex-col justify-end px-5 md:px-16 py-10 md:py-14 md:h-[80vh]'
      >
        <HeaderContent
          title={title}
          genres={genres}
          releaseYear={type === 'tv' ? duration : releaseYear}
          trailer={trailerKey as string}
          id={id}
          type={type as string}
        />
      </header>

      <div className='p-5 md:p-10 flex flex-col gap-10'>
        <div className=''>
          <h3 className='capitalize text-xl font-semibold py-3'>story line</h3>
          <p>{overview}</p>

          <>
            <h4 className='capitalize text-xl font-semibold py-3'>top cast</h4>
            <div className='overflow-x-scroll flex py-3 scrollbar'>
              {cast.map(({ name, id, profile_path, character }) => {
                return (
                  <div
                    key={id}
                    className='min-w-max h-full flex items-center gap-3 py-2 px-3'
                  >
                    <div className='w-16 h-16'>
                      <ImageWithPlaceholder
                        path={profile_path}
                        size={100}
                        className='rounded-full object-cover object-center w-full h-full'
                        alt={`profile of ${name}`}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-medium text-base'>{name}</p>
                      <p className='text-xs'>{character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </div>
        {reviews.results.length > 0 ? (
          <div>
            <h2 className='text-center text-xl font-semibold capitalize pb-5'>
              reviews
            </h2>
            <div>
              {reviews.results.map(
                ({ id, author, content, author_details }) => {
                  return (
                    <div
                      key={id}
                      className=' border-b last:border-b-0 py-7 flex flex-col gap-2'
                    >
                      <p>{author}</p>
                      <Ratings ratings={author_details.rating} />
                      <p>{content}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : null}

        <>
          {listItems.map((item) => (
            <TitleCard
              key={item.id}
              {...item}
              type={type === 'tv' ? 'tv' : 'movie'}
              id={id}
            />
          ))}
        </>
      </div>
    </main>
  );
}
