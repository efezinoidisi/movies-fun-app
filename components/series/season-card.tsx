import { getAverage } from '@/utils/helpers';
import CustomCarousel from '../Slider/carousel';
import MoviePoster from '../common/poster';
import Icons from '@/lib/icons';
import Link from 'next/link';
import SubHeading from '../common/sub-heading';

type Prop = {
  seasons: Season[];
  seriesId: string;
  seriesName: string;
};

export default function Seasons({ seasons, seriesId, seriesName }: Prop) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <article>
      <SubHeading text={'seasons'} />
      <CustomCarousel>
        {seasons.map((season) => {
          const seasonAverage = getAverage(season.vote_average);
          return (
            <div
              key={season.id}
              className='mr-2 rounded-xl pb-3 border-main/20 border hover:border-accent transition-all duration-300 ease-out bg-body group'
            >
              <Link
                href={{
                  pathname: `${seriesId}/season/${season.season_number}`,
                  query: { seriesName },
                }}
                prefetch={false}
              >
                <MoviePoster
                  posterPath={season.poster_path}
                  className='h-44 w-full overflow-hidden'
                  imageStyles='rounded-t-xl w-full h-full bg-cover aspect-[2/3] group-hover:scale-105'
                />
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
                </div>
              </Link>
            </div>
          );
        })}
      </CustomCarousel>
    </article>
  );
}
