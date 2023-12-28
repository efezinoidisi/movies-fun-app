import AddWatchlistButton from '@/components/Buttons/AddWatchlistButton';
import WatchTrailerButton from '@/components/Buttons/WatchTrailerButton';
import GenreList from '@/components/common/genre-list';
import SimpleLoader from '@/components/loaders/loader';
import { IMG_URL } from '@/constants/data';
import Icons from '@/lib/icons';
import Image from 'next/image';
import { Suspense } from 'react';

type Props = {
  title: string;
  releaseYear: string | null;
  trailer: string;
  id: number;
  type: string;
  runtime: string | null;
  poster: string;
  backdrop: string;
};

export default function HeroContent(props: Props) {
  const { title, releaseYear, trailer, id, type, runtime, poster, backdrop } =
    props;

  const style = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop})`,
  };
  return (
    <section
      style={style}
      className='relative hero text-white h-[70vh] flex items-end justify-between gap-10 px-5 md:px-16 py-10 md:py-14 md:h-[80vh]'
    >
      <div className='flex flex-col gap-3'>
        <span className='rounded-xl bg-black bg-opacity-60 px-2  capitalize text-xs font-mono leading-8 tracking-wider w-fit'>
          {type}
        </span>
        <h2 className='text-3xl text-bold capitalize'>{title}</h2>
        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
          <p className='min-w-max text-sm'>
            {releaseYear && `${releaseYear} |`} {runtime && runtime}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <WatchTrailerButton path={`/trailer?videoKey=${trailer}`} />
          <AddWatchlistButton id={id} border={true} showText={true} />
        </div>
      </div>
      <div className='w-80 h-52 md:h-5/6 hidden sl:block'>
        {poster && (
          <Image
            src={`${IMG_URL}${poster}`}
            width={400}
            height={400}
            alt={`${title}`}
            className='object-cover h-full w-full'
          />
        )}
      </div>
    </section>
  );
}
