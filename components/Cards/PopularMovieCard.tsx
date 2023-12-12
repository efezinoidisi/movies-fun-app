import Link from 'next/link';
import ImageLoader from '../ImageLoader';
import { GENRES, IMG_URL } from '@/constants/data';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { getAverage } from '@/utils/helpers';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import Favourite from '../Buttons/Favourite';

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
    media_type,
    id,
    backdrop_path,
    name,
  } = props;
  const average = getAverage(vote_average);
  const mediaType = media_type === 'movie' ? 'movies' : media_type;
  return (
    <Link href={`/${mediaType}/${id}`} className=''>
      {/* max-h-44 */}
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`flex gap-3 items-end rounded-lg py-3  hover:bg-gray-800 w-[17rem] px-2 min-h-[15rem] text-white transition-all duration-300 ease-in-out relative`}
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
          <h3 className='capitalize font-semibold text-lg'>
            {media_type === 'tv' ? name : title}
          </h3>
          <ul className='flex gap-1 text-xs opacity-80'>
            {genre_ids.map((id) => {
              return (
                <li key={id} className='group'>
                  {GENRES[id]}
                  <span className='group-last:hidden'>,</span>
                </li>
              );
            })}
          </ul>
          <div className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            <span className='font-semibold'> {average} </span>
            <span className='capitalize text-xs opacity-80'>
              | {media_type}
            </span>
            <AddWatchlistButton id={id} />
          </div>
        </div>
      </div>
    </Link>
  );
}
