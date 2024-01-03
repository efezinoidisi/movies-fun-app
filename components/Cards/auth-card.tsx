'use client';
import imdb from '@/assets/IMDb.png';
import { GENRES, IMG_URL } from '@/constants/data';
import Icons from '@/lib/icons';
import { checkTrimString, getAverage } from '@/utils/helpers';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import { merge } from '@/utils/merge';
import Link from 'next/link';

type Props = {
  movies: MovieList[];
};

export default function AuthCard({ movies }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMovie = movies[currentIndex];

  const prev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const next = () => {
    if (currentIndex === movies.length) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const { backdrop_path, title, release_date, genre_ids, vote_average, id } =
    currentMovie;

  const genres = genre_ids.slice(0, 2);
  const average = getAverage(vote_average);
  const date = new Date(release_date);
  const releaseYear = date.getFullYear();

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
      }}
      className={`hero flex justify-between items-end pb-4 md:pb-10 px-8 min-h-[15rem] md:min-h-screen text-white col-start-1 row-start-1 md:col-start-2 text-opacity-70`}
    >
      <div className='flex flex-col gap-1 md:gap-2'>
        <h3 className='text-white'>
          <Link href={`/movies/${id}`}>{title}</Link>
        </h3>
        <p className='text-xs md:text-sm'>{releaseYear}</p>
        <div className='md:flex gap-1 text-xs opacity-80 capitalize hidden'>
          <span className=''>genres: </span>
          {genres.map((id) => {
            return (
              <span key={id} className='group'>
                {GENRES[id]}
                <span className='group-last:hidden'>,</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className='min-w-max'>
        <div className='flex items-center gap-1'>
          <Image
            src={imdb}
            alt='imdb logo'
            width={100}
            height={100}
            className='w-8 md:w-10'
          />
          <Icons.star className={'text-yellow-500'} />
          <span className='text-xs md:text-sm'>{`${average}/10`}</span>
        </div>
        <div className='flex gap-2'>
          <Button
            className={merge(
              'bg-white bg-opacity-20 rounded-lg ',
              currentIndex === 0 ? 'invisible' : 'visible'
            )}
            onClick={prev}
          >
            <Icons.prev className='text-3xl md:text-5xl text-white' />
          </Button>
          <Button
            className={merge(
              'bg-white bg-opacity-20 rounded-lg ',
              currentIndex === movies.length - 1 ? 'invisible' : 'visible'
            )}
            onClick={next}
          >
            <Icons.next className='text-3xl md:text-5xl text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
}
