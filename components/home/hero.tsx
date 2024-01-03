'use client';
import { IMG_URL, GENRES } from '@/constants/data';
import NavHeader from '../navigation/NavHeader';
import WatchTrailerButton from '../Buttons/WatchTrailerButton';
import AddWatchlistButton from '../Buttons/AddWatchlistButton';
import { Suspense, useEffect, useState } from 'react';
import SimpleLoader from '../loaders/loader';
import { checkTrimString, getReleaseDate } from '@/utils/helpers';
import Link from 'next/link';

export default function Hero({ movies }: { movies: MovieList[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // movie currently shown;
  let currentMovie = movies[currentIndex];

  const releaseYear = getReleaseDate(currentMovie.release_date, 'short');
  useEffect(() => {
    const unSub = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev === 4 ? 0 : prev + 1;
      });
    }, 15000);

    return () => clearInterval(unSub);
  }, [currentIndex]);
  const MAX = 200;
  const overview = checkTrimString(currentMovie.overview, MAX);

  const { id, genre_ids, backdrop_path, name, title, vote_average } =
    currentMovie;
  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };

  return (
    <section
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.70) 100%),url(${IMG_URL}${backdrop_path})`,
      }}
      className='min-h-screen w-full hero lg:header text-white bg-opacity-30 flex flex-col justify-between gap-10 md:px-20  px-5 pt-40 lg:pt-64 pb-20'
    >
      <div className='flex flex-col justify-between gap-10 md:gap-0 md:flex-row'>
        <div className='flex flex-col gap-3'>
          <span className='bg-opacity-50 bg-black py-1 px-2 rounded-full capitalize w-fit text-xs'>
            movie
          </span>
          <Link href={`/movies/${id}?type=movie`}>
            <h2 className='capitalize text-4xl'>{title}</h2>
          </Link>
          <ul className='list-inside flex gap-3 text-sm text-white opacity-70 flex-wrap'>
            <li className=''>{releaseYear || ''}</li>
            {genre_ids.map((id) => {
              return (
                <li key={id} className='list-disc'>
                  {GENRES[id]}
                </li>
              );
            })}
          </ul>
          <p className='md:max-w-md leading-5 tracking-wide opacity-90'>
            {overview}
            <Link
              href={`/movies/${id}?type=movie`}
              className='underline pl-2 text-blue-500'
            >
              more
            </Link>
          </p>

          <div className='flex gap-2 items-center'>
            <Suspense fallback={<SimpleLoader />}>
              <WatchTrailerButton
                path={`/trailer?movieId=${id}&title=${title}`}
              />
            </Suspense>
            <Suspense fallback={<SimpleLoader />}>
              <AddWatchlistButton
                movie={moviePayload}
                showText={true}
                border={true}
              />
            </Suspense>
          </div>
        </div>
        <div className=' flex gap-2 items-end md:justify-start justify-center '>
          {movies.map(({ id }, index) => (
            <span
              key={id}
              className={`transition-transform duration-100 ease-linear ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              } cursor-pointer w-2 h-2 rounded-full hover:bg-white/80`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

// get random index
// const getRandomIndex = (size: number) => {
//   const index = Math.floor(Math.random() * size);
//   return index;
// };
