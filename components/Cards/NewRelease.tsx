import { GENRES, IMG_URL } from '@/constants/data';
import { getAverage } from '@/utils/helpers';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';

export default function NewReleaseCard(props: MovieList) {
  const { backdrop_path, title, vote_average, genre_ids } = props;
  const average = getAverage(vote_average);
  return (
    <Link href={''}>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className={`header relative justify-end flex flex-col px-4 h-56 rounded-lg mr-2 pb-3 text-white`}
      >
        <h3 className='capitalize font-semibold text-md'>{title}</h3>
        <ul className='list-inside flex list-disc gap-2 flex-wrap text-sm'>
          <li className=' first:list-none flex items-center gap-1 font-medium'>
            <AiFillStar className={'text-yellow-500'} />
            {average}
          </li>
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
  );
}
