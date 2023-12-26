import { GENRES, IMG_URL } from '@/constants/data';
import { getAverage } from '@/utils/helpers';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import Favourite from '../Buttons/Favourite';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import GenreList from '../common/genre-list';

type Props = MovieList & {
  type?: 'movie' | 'tv' | 'person';
};

export default function NewReleaseCard(props: Props) {
  const {
    backdrop_path,
    title,
    vote_average,
    genre_ids,
    id,
    name,
    type = 'movie',
  } = props;
  const average = getAverage(vote_average);
  const genres = genre_ids.slice(0, 2);
  const displayedTitle = type === 'tv' ? name : title;

  const page = `${type}${type === 'movie' ? 's' : ''}`;
  return (
    <Link href={`/${page}/${id}`}>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.70) 100%),url(${IMG_URL}${backdrop_path})`,
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
        <h3 className='capitalize font-semibold text-md'>{displayedTitle}</h3>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            {average}
          </p>
          <AddWatchlistButton id={id} extraStyles='z-10' />
        </div>
        <GenreList genres={genres} type='without-id' />
      </div>
    </Link>
  );
}
