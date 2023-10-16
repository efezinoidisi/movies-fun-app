import tmdb from '@/assets/imbd-logo.svg';
import Image from 'next/image';

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className=' py-10 border-t border-gray-700 px-5 flex flex-col gap-5'>
      <p>
        <Image src={tmdb} alt='the movie  db logo' width={70} height={70} />
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <p>&copy; {currentYear} All rights reserved</p>
    </div>
  );
}
