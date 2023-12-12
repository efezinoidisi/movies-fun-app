import { GENRES, IMG_URL } from '@/constants/data';
import { getAverage } from '@/utils/helpers';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import Favourite from '../Buttons/Favourite';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';

export default function NewReleaseCard(props: MovieList) {
  const { backdrop_path, title, vote_average, genre_ids, id } = props;
  const average = getAverage(vote_average);
  const genres = genre_ids.slice(0, 2);
  return (
    <Link href={`/movies/${id}?type=movie`}>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`header relative justify-end flex flex-col px-4 h-56 rounded-lg mr-2 pb-3 text-white`}
      >
        <Favourite
          id={id}
          position='absolute'
          extraStyles='top-3 right-0 z-10'
        />

        <h3 className='capitalize font-semibold text-md'>{title}</h3>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-1'>
            <AiFillStar className={'text-yellow-500'} />
            {average}
          </p>
          <AddWatchlistButton id={id} extraStyles='z-10' />
        </div>
        <ul className='flex gap-2 text-sm'>
          {genres.map((id) => {
            return (
              <li
                key={id}
                className='border even:border-e-blue-500
                  even:border-s-red-500
                  border-e-red-500
                  border-main-500
                  border-s-blue-500 rounded-md px-1'
              >
                {GENRES[id]}
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
}
