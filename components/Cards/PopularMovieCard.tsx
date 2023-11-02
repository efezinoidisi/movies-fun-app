import Link from 'next/link';
import ImageLoader from '../ImageLoader';
import { GENRES } from '@/constants/data';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { getAverage } from '@/utils/helpers';

type CardProps = MovieList & {
  index: number;
};

export default function PopularMovieCard(props: CardProps) {
  const { poster_path, title, vote_average, genre_ids, index, media_type } =
    props;
  const average = getAverage(vote_average);
  return (
    <Link href={''} className=''>
      {/* max-h-44 */}
      <div
        className={`flex gap-3 items-center rounded-lg py-3  hover:bg-gray-800 w-[17rem] px-2 bg-inner shadow-ml min-h-[15rem] hover:text-white transition-all duration-300 ease-in-out`}
      >
        <h2 className='col-span-1  text-2xl font-bold'> {index + 1}</h2>
        <div className={'max-h-40 h-40 w-48  overflow-hidden'}>
          <ImageLoader
            img={poster_path}
            alt=''
            size={0}
            className='object-cover w-full h-full rounded-md'
          />
        </div>
        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-md'>{title}</h3>
          <ul className='list-inside flex list-disc gap-2 flex-wrap text-xs opacity-80'>
            {genre_ids.map((id) => {
              return (
                <li key={id} className=' pl-0'>
                  {GENRES[id]}
                </li>
              );
            })}
          </ul>
          <p className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            <span className='font-semibold'> {average} </span>
            <span className='capitalize text-xs opacity-80'>
              | {media_type}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
