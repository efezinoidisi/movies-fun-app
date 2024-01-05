import Link from 'next/link';
import { IMG_URL } from '@/constants/data';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';
import MoviePoster from '../common/poster';
import Rating from '../common/rating';

type CardProps = MovieList & {
  index: number;
};

export default function PopularMovieCard(props: CardProps) {
  const {
    poster_path,
    title,
    vote_average,
    genre_ids,
    index,
    id,
    backdrop_path,
    name,
  } = props;

  const type = name ? 'tv' : 'movie';
  const page = `${type}${type === 'tv' ? '' : 's'}`;

  const genres = genre_ids.slice(0, 1);

  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };

  return (
    <Link prefetch={false} href={`/${page}/${id}`} className='block'>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`flex hero gap-3 items-end rounded-lg py-3  hover:bg-gray-800 px-2 min-h-[20rem] text-white transition-all duration-300 ease-in-out relative overflow-x-hidden mr-2`}
      >
        <Favourite
          movie={moviePayload}
          position='absolute'
          extraStyles='z-10 top-3 right-2'
        />

        <p className='absolute top-0 text-5xl font-extrabold left-2'>
          {' '}
          {index + 1}
        </p>
        <MoviePoster
          posterPath={poster_path}
          className='min-w-[7rem] max-w-[7rem] overflow-hidden relative'
          imageStyles='object-cover w-full h-full rounded-md'
          alt={`poster for ${name || title}`}
        />
        <div className={'flex flex-col gap-1'}>
          <h3 className='capitalize font-semibold text-xl line-clamp-1'>
            {name || title}
          </h3>
          <GenreList genres={genres} type='without-id' />
          <div className='flex items-center gap-1'>
            <Rating rating={vote_average} />
            <span className='opacity-80'>|</span>
            <span className='capitalize text-xs opacity-80'>{type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
