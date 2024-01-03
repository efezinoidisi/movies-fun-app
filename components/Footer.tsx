import tmdb from '@/assets/imbd-logo.svg';
import Image from 'next/image';

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=' pt-10 pb-20 md:py-10 border-t border-gray-700 px-5 flex flex-col gap-5 justify-center items-center'>
      <div>
        <h5 className='font-bold text-md md:text-lg'>
          movies
          <span className='uppercase bg-clip-text text-transparent bg-gradient-to-bl from-accent to-white'>
            fun
          </span>
        </h5>
      </div>
      <div className='flex items-center md:items-end gap-2'>
        <Image
          src={tmdb}
          alt='the movie  db logo'
          width={70}
          height={70}
          className='w-10'
        />
        <p className='text-xs'>
          This project uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <p className='text-sm'>
        made with ❤ by Efezino. &copy; {currentYear} All rights reserved
      </p>
    </footer>
  );
}
