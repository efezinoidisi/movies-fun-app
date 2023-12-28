import Link from 'next/link';
import { GENRES, IMG_URL } from '@/constants/data';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';
import MoviePoster from '../common/movie-poster';
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

  const genres = genre_ids.slice(0, 2);
  return (
    <Link href={`/${page}/${id}`} className=''>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`flex gap-3 items-end rounded-lg py-3  hover:bg-gray-800 px-2 min-h-[20rem] text-white transition-all duration-300 ease-in-out relative overflow-x-hidden mr-5`}
      >
        <Favourite
          id={id}
          position='absolute'
          extraStyles='z-10 top-3 right-2'
        />

        <p className='absolute top-0 text-5xl font-extrabold left-2'>
          {' '}
          {index + 1}
        </p>
        <MoviePoster
          posterPath={poster_path}
          className='min-w-[6rem] max-w-[6rem] overflow-hidden relative'
          imageStyles='object-cover w-full h-full rounded-md'
        />
        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-md line-clamp-1'>
            {name || title}
          </h3>
          <GenreList genres={genres} type='without-id' />
          <div className='flex items-center gap-1'>
            <Rating rating={vote_average} />
            <span className='opacity-80'>|</span>
            <span className='capitalize text-xs opacity-80'>{type}</span>
            <AddWatchlistButton id={id} />
          </div>
        </div>
      </div>
    </Link>
  );
}
