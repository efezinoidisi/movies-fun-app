import Link from 'next/link';
import ImageLoader from '../ImageLoader';
import { GENRES, IMG_URL } from '@/constants/data';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { checkTrimString, getAverage } from '@/utils/helpers';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';

type CardProps = MovieList & {
  index: number;
  type?: 'movie' | 'tv';
};

export default function PopularMovieCard(props: CardProps) {
  const {
    poster_path,
    title,
    vote_average,
    genre_ids,
    index,
    media_type,
    id,
    backdrop_path,
    name,
    type = 'movie',
  } = props;
  const average = getAverage(vote_average);
  const mediaType = type === 'movie' ? 'movies' : type;

  const movieTitle = checkTrimString(type === 'tv' ? name : title, 15);
  const genres = genre_ids.slice(0, 2);
  return (
    <Link href={`/${mediaType}/${id}`} className=''>
      {/* max-h-44 */}
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
        <div
          className={'h-44 max-h-44 w-48 min-w-[6rem] overflow-hidden relative'}
        >
          <Image
            src={`${IMG_URL}${poster_path}`}
            alt={`${title}`}
            width={300}
            height={500}
            className='object-cover w-full h-full rounded-md'
          />
        </div>
        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-lg'>{movieTitle}</h3>
          <GenreList genres={genres} type='without-id' />
          <div className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            <span className='font-semibold text-xs'> {average} </span>
            <span className='opacity-80'>|</span>
            <span className='capitalize text-xs opacity-80'>{media_type}</span>
            <AddWatchlistButton id={id} />
          </div>
        </div>
      </div>
    </Link>
  );
}
