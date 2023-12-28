import Link from 'next/link';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';
import Rating from '../common/rating';
import MoviePoster from '../common/movie-poster';

export default function MovieCard(props: MovieList) {
  const {
    poster_path,
    title,
    vote_average,
    id,
    genre_ids,
    name,
    release_date,
    first_air_date,
  } = props;

  const type = name ? 'tv' : 'movie';
  const date = new Date(release_date);
  const genres = genre_ids.slice(0, 2);

  const firstAirDate = new Date(first_air_date);
  const releaseYear = title ? date.getFullYear() : firstAirDate.getFullYear();

  const page = `${type}${type === 'tv' ? '' : 's'}`;
  return (
    <div
      className={`flex flex-col gap-3 items-start rounded-lg  transition-colors ease-in relative bg-body mr-1 pb-4 md:pb-0  min-h-[18rem] border border-y-main border-x-accent hover:border-2 hover:shadow-ul overflow-x-hidden w-full`}
    >
      <Favourite id={id} position='absolute' extraStyles='right-2 top-5' />
      <Link href={`/${page}/${id}`} className='w-full h-full block pb-3'>
        <MoviePoster
          posterPath={poster_path}
          imageStyles='w-full h-full rounded-t-lg bg-cover'
        />

        <div className={'flex flex-col col-span-2 gap-2 pt-3 px-3'}>
          <h3 className='capitalize font-semibold text-md line-clamp-1 text-white'>
            {name || title}
          </h3>

          <div className='flex justify-between items-center text-xs md:text-sm'>
            <p>{releaseYear || ''}</p>
            <p className='flex items-center gap-1'>
              <Rating rating={vote_average} />
              <span className='capitalize text-xs opacity-80 font-mono'>
                | {type}
              </span>
            </p>
          </div>
          <GenreList genres={genres} type='without-id' />
        </div>
      </Link>
    </div>
  );
}
