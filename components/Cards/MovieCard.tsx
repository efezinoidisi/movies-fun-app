import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { getAverage } from '@/utils/helpers';
import Image from 'next/image';
import { GENRES, IMG_URL } from '@/constants/data';
import Favourite from '../Favourite';
import getPlaceholder from '@/utils/placeholder';

type CardProps = MovieList & {
  type: 'movie' | 'tv';
};

export default async function MovieCard(props: CardProps) {
  const {
    poster_path,
    title,
    vote_average,
    type,
    id,
    genre_ids,
    name,
    release_date,
    first_air_date,
  } = props;

  const average = getAverage(vote_average);
  const res = await getPlaceholder(poster_path);

  const date = new Date(release_date);

  const firstAirDate = new Date(first_air_date);
  const releaseYear =
    type !== 'tv' ? date.getFullYear() : firstAirDate.getFullYear();

  return (
    <div
      className={`flex flex-col gap-3 items-start rounded-lg py-3 hover:bg-gray-800 px-2 relative `}
    >
      <Favourite movieId={id} />
      <Link
        href={{
          pathname: `/movies/${id}`,
          query: { type },
        }}
        className='w-full'
      >
        <div className={'w-full  overflow-hidden h-80 sl:h-64'}>
          <Image
            src={`${IMG_URL}${poster_path}`}
            alt=''
            width={0}
            height={0}
            sizes='100vw 100%'
            className='w-full h-full rounded-lg'
            placeholder='blur'
            blurDataURL={res?.base64}
          />
        </div>

        <div className={'flex flex-col col-span-2 gap-1'}>
          <h3 className='capitalize font-semibold text-md'>
            {type === 'tv' ? name : title}
          </h3>

          <div className='flex justify-between items-center'>
            <p>{releaseYear}</p>
            <p className='flex items-center gap-1'>
              <AiFillStar className={'text-yellow-500'} />
              <span className='font-semibold'> {average} </span>
              <span className='capitalize text-xs opacity-80'>| {type}</span>
            </p>
          </div>
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
      </Link>
    </div>
  );
}
