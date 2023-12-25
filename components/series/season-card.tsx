import { checkTrimString, getAverage } from '@/utils/helpers';
import CustomCarousel from '../Slider/carousel';
import MoviePoster from '../common/movie-poster';
import Icons from '@/lib/icons';
import { popularMoviesOptions } from '@/constants/data';

type Prop = {
  seasons: Season[];
};

export default function Seasons({ seasons }: Prop) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <article>
      <h3 className='capitalize font-bold'>seasons</h3>
      <CustomCarousel options={popularMoviesOptions}>
        {seasons.map((season) => {
          const seasonAverage = getAverage(season.vote_average);
          return (
            <div
              key={season.id}
              className='mr-2 border-t-8 border-r-8 border-text rounded-xl min-h-[25rem] border hover:border-accent transition-all duration-300 ease-out '
            >
              <MoviePoster posterPath={season.poster_path} />
              <div className='px-2 py-1'>
                <h4 className='flex gap-1 items-center min-w-max text-lg font-semibold justify-between'>
                  <span className='text-accent'>{season.name}</span>
                  <span className='flex items-center text-sm'>
                    <Icons.star className={'text-yellow-500'} />

                    {seasonAverage}
                  </span>
                </h4>
                <p className='text-sm text-center'>
                  Episodes: {season.episode_count}
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
