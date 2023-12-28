import { checkTrimString, getAverage } from '@/utils/helpers';
import CustomCarousel from '../Slider/carousel';
import MoviePoster from '../common/movie-poster';
import Icons from '@/lib/icons';

type Prop = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Prop) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <article>
      <h3 className='capitalize font-bold pb-7'>seasons</h3>
      <CustomCarousel>
        {seasons.map((season) => {
          const seasonAverage = getAverage(season.vote_average);
          return (
            <div
              key={season.id}
              className='mr-2 border-t-2 border-r-2 border-text rounded-xl min-h-[27rem] border hover:border-accent transition-all duration-300 ease-out '
            >
              <MoviePoster posterPath={season.poster_path} />
              <div className='px-2 py-1 flex flex-col gap-2'>
                <h4 className=' truncate text-lg font-semibold'>
                  {season.name}
                </h4>
                <p className='text-sm flex justify-between items-center'>
                  <span>{season.episode_count} episodes</span>
                  <span className='flex items-center text-sm'>
                    <Icons.star className={'text-yellow-500'} />

                    {seasonAverage}
                  </span>
                </p>
                <p className='text-sm'>
                  {checkTrimString(season.overview, 50)}
                </p>
              </div>
            </div>
          );
        })}
      </CustomCarousel>
    </article>
  );
}
