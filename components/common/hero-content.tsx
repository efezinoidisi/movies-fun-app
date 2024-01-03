import AddWatchlistButton from '@/components/Buttons/AddWatchlistButton';
import WatchTrailerButton from '@/components/Buttons/WatchTrailerButton';
import { IMG_URL } from '@/constants/data';
import MoviePoster from './poster';

type Props = {
  releaseYear: string | null;
  trailer: string;
  type: string;
  runtime: string | null;
  poster: string;
  payload: MediaItem;
};

export default function HeroContent(props: Props) {
  const { releaseYear, trailer, type, runtime, poster, payload } = props;

  const style = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${payload.backdrop_path})`,
  };
  return (
    <section
      style={style}
      className='relative hero text-white min-h-[63svh] flex items-end justify-between gap-10 px-5 md:px-16 py-10 md:py-14 md:h-[80vh]'
    >
      <div className='flex flex-col gap-3'>
        <span className='rounded-xl bg-black bg-opacity-60 px-2  capitalize text-xs font-mono leading-8 tracking-wider w-fit'>
          {type}
        </span>
        <h2 className='text-3xl text-bold capitalize'>{payload.title|| payload.name}</h2>
        <div className='flex flex-col md:flex-row gap-2 md:items-center'>
          <p className='min-w-max text-sm'>
            {releaseYear && `${releaseYear}`} {releaseYear && runtime && '|'}{' '}
            {runtime && runtime}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <WatchTrailerButton path={`/trailer?videoKey=${trailer}`} />
          <AddWatchlistButton movie={payload} border={true} showText={true} />
        </div>
      </div>

      <MoviePoster
        posterPath={poster}
        className='w-80 h-52 md:h-5/6 hidden md:block'
      />
    </section>
  );
}
