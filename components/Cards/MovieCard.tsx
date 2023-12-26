import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { checkTrimString, getAverage } from '@/utils/helpers';
import Image from 'next/image';
import { GENRES, IMG_URL } from '@/constants/data';
import Favourite from '../Buttons/Favourite';
import GenreList from '../common/genre-list';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';

type Props = MovieList & {
  type: 'movie' | 'tv' | 'person';
};

export default function MovieCard(props: Props) {
  const {
    poster_path,
    title,
    vote_average,
    id,
    genre_ids,
    name,
    release_date,
    first_air_date,
    type = 'movie',
  } = props;

  const average = getAverage(vote_average);

  const date = new Date(release_date);
  const genres = genre_ids.slice(0, 2);

  const firstAirDate = new Date(first_air_date);
  const releaseYear =
    type !== 'tv' ? date.getFullYear() : firstAirDate.getFullYear();

  const displayedHeading = type === 'tv' ? name : title;

  const page = `${type}${type === 'movie' ? 's' : ''}`;
  return (
    <div
      className={`flex flex-col gap-3 items-start rounded-lg  transition-colors ease-in relative bg-white mr-1 pb-4 md:pb-0  min-h-[22rem] border border-y-main border-x-accent hover:border-2 hover:shadow-ul overflow-x-hidden`}
    >
      <Favourite id={id} position='absolute' extraStyles='right-2 top-5' />
      <Link href={`/${page}/${id}`} className='w-full h-full block p-3'>
        <div className={'w-full  overflow-hidden h-80 sl:h-64'}>
          <Image
            src={`${IMG_URL}${poster_path}`}
            alt=''
            width={0}
            height={0}
            sizes='100vw 100%'
            className='w-full h-full rounded-lg'
          />
        </div>

        <div className={'flex flex-col col-span-2 gap-2 pt-3'}>
          <h3 className='capitalize font-semibold text-md min-w-max hidden md:block'>
            {checkTrimString(displayedHeading, 15)}
          </h3>
          <h3 className='capitalize font-semibold text-lg min-w-max md:hidden'>
            {displayedHeading}
          </h3>

          <div className='flex justify-between items-center text-xs md:text-sm'>
            <p>{releaseYear}</p>
            <p className='flex items-center gap-1'>
              <AiFillStar className={'text-yellow-500'} />
              <span className='font-semibold'> {average} </span>
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
