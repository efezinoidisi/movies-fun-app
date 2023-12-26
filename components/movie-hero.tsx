import { GENRES, IMG_URL } from '@/constants/data';
import Link from 'next/link';
import WatchTrailerButton from './Buttons/WatchTrailerButton';
import AddWatchlistButton from './Buttons/AddWatchlistButton';
import { Suspense } from 'react';
import SimpleLoader from './loaders/loader';
import { merge } from '@/utils/merge';

type Props = {
  backdrop: string;
  type?: 'movie' | 'tv';
  title: string;
  genres: number[];
  releaseYear: number;
  overview: string;
  id: number;
  children?: React.ReactNode;
  height?: string;
  runtime?: string;
};

export default function MovieHero(props: Props) {
  const {
    backdrop,
    type = 'movie',
    title,
    genres,
    releaseYear,
    overview,
    id,
    children,
    height = 'h-screen',
    runtime,
  } = props;
  return (
    <section
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop})`,
      }}
      className={merge(
        'w-full header text-white bg-opacity-30 flex flex-col justify-between gap-10 md:px-20  px-5 pt-36 md:pt-56 lg:pt-64 pb-20',
        height
      )}
    >
      <div className='flex flex-col justify-between gap-10 md:gap-0 md:flex-row'>
        <div className='flex flex-col gap-3'>
          <span className='bg-opacity-50 bg-black py-1 px-2 rounded-full capitalize w-fit text-xs'>
            {type}
          </span>
          <h2 className='capitalize text-4xl'>{title}</h2>
          <ul className='list-inside flex gap-3 text-sm text-white opacity-70 flex-wrap'>
            <li className=''>
              {releaseYear} {runtime && `| ${runtime}`}
            </li>
            {genres.map((id) => {
              return (
                <li key={id} className='list-disc'>
                  {GENRES[id]}
                </li>
              );
            })}
          </ul>
          <p className='md:max-w-md leading-5 tracking-wide opacity-90'>
            {overview}
            <Link href={`/movies/${id}?type=movie`} className='underline pl-2'>
              more
            </Link>
          </p>

          <div className='flex gap-2 items-center'>
            <Suspense fallback={<SimpleLoader />}>
              <WatchTrailerButton path={`/movies/${id}`} />
            </Suspense>
            <Suspense fallback={<p>loading</p>}>
              <AddWatchlistButton id={id} showText={true} border={true} />
            </Suspense>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
