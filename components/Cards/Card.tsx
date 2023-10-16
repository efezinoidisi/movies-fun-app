import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { getAverage } from '@/utils/helpers';
import Image from 'next/image';
import { IMG_URL, GENRES } from '@/constants/data';

type CardProps = MovieList & {
  type: 'movie' | 'tv';
};

export default function Card(props: CardProps) {
  const { poster_path, title, vote_average, type, id, name, genre_ids } = props;

  const average = getAverage(vote_average);

  return (
    <Link
      href={{
        pathname: `/movies/${id}`,
        query: { type },
      }}
      className=''
    >
      <div
        className={`flex flex-col gap-3 items-start rounded-lg py-3 max-h-72 hover:bg-gray-800 px-2`}
      >
        <div className={'h-52 w-full relative overflow-hidden'}>
          <Image
            src={`${IMG_URL}${poster_path}`}
            alt=''
            fill
            className='w-full h-full rounded-md'
          />
        </div>

        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-md max-w-[11rem]'>
            {type === 'tv' ? name : title}
          </h3>

          <p className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            <span className='font-semibold'> {average} </span>
            <span className='capitalize text-xs opacity-80'>| {type}</span>
          </p>
          <ul className='list-inside flex list-disc gap-2 flex-wrap text-sm lowercase'>
            {genre_ids.map((id) => {
              return (
                <li key={id} className='first:list-none pl-0'>
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
