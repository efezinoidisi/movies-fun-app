import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { getAverage } from '@/utils/helpers';
import Image from 'next/image';
import { IMG_URL, GENRES } from '@/constants/data';
import Favourite from '../Buttons/Favourite';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import Icons from '@/lib/icons';
type CardProps = MovieList & {
  type: 'movie' | 'tv';
};

export default function Card(props: CardProps) {
  const { poster_path, title, vote_average, type, id, name, genre_ids } = props;

  const average = getAverage(vote_average);
  const genres = genre_ids.slice(0, 2);
  const path = `${type}${type === 'movie' ? 's' : ''}`;
  return (
    <Link href={`/${path}/${id}`} className='block'>
      <div
        className={`relative flex flex-col items-start py-3 bg-white bg-opacity-80  px-2 gap-3 min-h-[25rem] mr-2 rounded-xl border-b-[.4rem]  border-l-[.1rem] border-t-[.1rem] border-r-[.4rem] border-main border-opacity-60
        `}
      >
        <Favourite
          id={id}
          position='absolute'
          extraStyles='z-10 top-5 right-2'
        />

        <div className={'min-h-[12rem] w-full relative overflow-hidden'}>
          <Image
            src={`${IMG_URL}${poster_path}`}
            alt=''
            fill
            sizes='100vw 100%'
            className='w-full h-full rounded-md border border-main border-opacity-40'
          />
        </div>
        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-md max-w-[11rem] min-w-min'>
            {type === 'tv' ? name : title}
          </h3>

          <div className='flex items-center gap-1'>
            <Icons.star className={'text-yellow-500'} />
            <span className='font-semibold'> {average} </span>
            <span className='capitalize text-xs opacity-80'>| {type}</span>
            <AddWatchlistButton id={id} extraStyles='ml-auto' />
          </div>
          <ul className='flex  gap-2 flex-wrap text-sm lowercase'>
            {genres.map((id) => {
              return (
                <li
                  key={id}
                  className='border even:border-e-blue-500
                  even:border-s-red-500
                  border-e-red-500
                  border-purple-500
                  border-s-blue-500 rounded-md px-1'
                >
                  {GENRES[id]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
}
