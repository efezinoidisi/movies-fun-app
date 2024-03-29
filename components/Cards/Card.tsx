import Link from 'next/link';
import Favourite from '../Buttons/Favourite';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import Rating from '../common/rating';
import GenreList from '../common/genre-list';
import MoviePoster from '../common/poster';
type CardProps = MovieList & {
  type?: 'movie' | 'tv';
};

export default function Card(props: CardProps) {
  const {
    poster_path,
    title,
    vote_average,
    type,
    id,
    name,
    genre_ids,
    backdrop_path,
  } = props;
  const genres = genre_ids.slice(0, 1);
  const path = name ? 'tv' : 'movies';

  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };

  return (
    <Link href={`/${path}/${id}`} className='block' prefetch={false}>
      <div
        className={`relative flex flex-col items-start py-3 bg-body  px-2 gap-3 min-h-[25rem] mr-2 rounded-xl border-b-[.18rem]  border-l-[.1rem] border-t-[.1rem] border-r-[.18rem] border-text border-opacity-60
        `}
      >
        <Favourite
          movie={moviePayload}
          position='absolute'
          extraStyles='z-10 top-5 right-2'
        />

        <MoviePoster
          posterPath={poster_path}
          alt={`poster for ${name || title}`}
        />
        <div className={'flex flex-col col-span-2 gap-1 w-full line-clamp-1'}>
          <h3 className='capitalize font-semibold text-md text-white'>
            {name || title}
          </h3>

          <div className='flex items-center gap-1'>
            <Rating rating={vote_average} />
            <span className='capitalize text-xs opacity-80'>| {type}</span>
            <AddWatchlistButton movie={moviePayload} extraStyles='ml-auto' />
          </div>
          <GenreList genres={genres} type='without-id' />
        </div>
      </div>
    </Link>
  );
}
