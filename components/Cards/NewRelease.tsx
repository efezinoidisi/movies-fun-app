import { IMG_URL } from '@/constants/data';
import Link from 'next/link';
import Favourite from '../Buttons/Favourite';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import GenreList from '../common/genre-list';
import Rating from '../common/rating';

export default function NewReleaseCard(props: MovieList) {
  const { backdrop_path, title, vote_average, genre_ids, id, name } = props;
  const type = name ? 'tv' : 'movie';
  const genres = genre_ids.slice(0, 1);

  const page = name ? 'tv' : 'movies';
  return (
    <Link href={`/${page}/${id}`}>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.60) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`hero relative justify-end flex flex-col px-4 min-h-[20rem] rounded-lg mr-2 pb-3 text-white overflow-x-hidden`}
      >
        <Favourite
          id={id}
          position='absolute'
          extraStyles='top-3 right-0 z-10'
        />
        <span className='bg-black bg-opacity-40 px-2 text-[0.6rem] py-1 rounded-lg w-fit'>
          {type}
        </span>
        <h3 className='capitalize font-semibold text-md truncate'>
          {name || title}
        </h3>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-1'>
            <Rating rating={vote_average} />
          </p>
          <AddWatchlistButton id={id} extraStyles='z-10' />
        </div>
        <GenreList genres={genres} type='without-id' />
      </div>
    </Link>
  );
}
