import Link from 'next/link';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';
import Rating from '../common/rating';
import MoviePoster from '../common/poster';
import { getReleaseDate } from '@/utils/helpers';

export default function MovieCard(props: MovieList) {
  const {
    backdrop_path,
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
  const genres = genre_ids.slice(0, 1);
  const releaseYear = getReleaseDate(release_date || first_air_date, 'short');

  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };
  const page = `${type}${type === 'tv' ? '' : 's'}`;
  return (
    <div
      className={`flex flex-col gap-3 items-start rounded-lg  transition-colors ease-in relative bg-body mr-1 pb-4 md:pb-0  md:min-h-[18rem] border border-y-main/50 border-x-accent/50 hover:border-2 hover:shadow-al overflow-x-hidden w-full`}
    >
      <Favourite
        movie={moviePayload}
        position='absolute'
        extraStyles='right-2 top-5'
      />
      <Link
        href={`/${page}/${id}`}
        className='w-full h-full block pb-3'
        prefetch={false}
      >
        <MoviePoster
          posterPath={poster_path}
          imageStyles='w-full h-full rounded-t-lg bg-cover'
          className='w-full aspect-[2/3]'
          alt={`poster for ${name || title}`}
        />

        <div className={'flex flex-col col-span-2 gap-2 pt-3 px-3'}>
          <h3 className='capitalize font-semibold text-md line-clamp-1 text-white'>
            {name || title}
          </h3>

          <div className='flex justify-between items-center text-xs md:text-sm min-w-max'>
            <p>{releaseYear || ''}</p>
            <p className='flex items-center gap-1'>
              <Rating rating={vote_average} />
              <span className='capitalize text-xs opacity-80 font-mono'>
                | {type}
              </span>
            </p>
          </div>
          <GenreList genres={genres} type='without-id' page={type} />
        </div>
      </Link>
    </div>
  );
}
