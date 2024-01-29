import Heading from '@/components/common/heading';
import Poster from '@/components/common/poster';
import Rating from '@/components/common/rating';
import SubHeading from '@/components/common/sub-heading';
import { IMG_URL } from '@/constants/data';
import { fetchList } from '@/utils/fetchList';
import { getReleaseDate } from '@/utils/helpers';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: {
    number: string;
    id: string;
  };
  searchParams: {
    seriesName: string;
  };
};

export const revalidate = 86400; // revalidate after 24 hours(1 day)

export default async function page(props: Props) {
  const {
    params: { number, id },
    searchParams: { seriesName },
  } = props;

  const seriesData: Promise<SeasonDetails> = await fetchList(
    `tv/${id}/season/${number}?append_to_response=videos,credits,recommendations,reviews,similar`
  );
  const {
    episodes,
    name,
    season_number,
    vote_average,
    poster_path,
    air_date,
    overview,
  } = await seriesData;

  const date = getReleaseDate(air_date, 'full');

  const details = [
    {
      title: 'air date',
      value: date,
    },
    {
      title: 'rating',
      value: <Rating rating={vote_average} />,
    },
    {
      title: 'season',
      value: season_number,
    },
    {
      title: 'episodes',
      value: episodes.length,
    },
  ];

  const episodesContent =
    episodes.length > 0
      ? episodes.map((episode) => {
          return (
            <EpisodeCard
              photo={episode.still_path}
              key={episode.id}
              airDate={episode.air_date}
              overview={episode.overview}
              name={episode.name}
              num={episode.episode_number}
              crew={episode.crew}
            />
          );
        })
      : null;

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.60) 100%),url(${IMG_URL}${poster_path})`,
        }}
        className={`hero relative min-h-[8rem]`}
      ></div>

      <section className='w-11/12 mx-auto py-7'>
        <Heading text={`${seriesName} | ${name}`} />

        <p className='tracking-wide leading-6 md:leading-7 lg:leading-8'>
          {overview}
        </p>
        <div className='grid md:grid-cols-2 justify-items-center md:justify-items-stretch gap-y-5 w-full mt-4 gap-x-2'>
          <div className='flex flex-col gap-y-4'>
            {details.map(({ title, value }) => (
              <div key={title} className='flex items-center  capitalize'>
                <p className='min-w-[7rem]'>{title}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <Poster
            posterPath={poster_path}
            alt={name}
            className='w-full border border-accent rounded-lg max-w-xs row-start-1 md:col-start-2'
            imageStyles='w-full h-full rounded-lg'
          />
        </div>
        {episodesContent ? (
          <div className='mt-10'>
            <SubHeading text='episodes' />
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-3 mt-5'>
              {episodesContent}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

type EpisodeCardProps = {
  photo: string;
  overview: string;
  num: number;
  name: string;
  airDate: string;
  crew: EpisodeCrew[];
};

const EpisodeCard = (props: EpisodeCardProps) => {
  const { photo, overview, name, num, airDate, crew } = props;

  const date = getReleaseDate(airDate, 'full');

  const directors = crew?.filter(({ job }) => job === 'Director');

  const directorNode =
    directors.length > 0
      ? directors.map((director) => (
          <Link
            href={`/people/${director.id}`}
            className='underline hover:text-accent transition-colors duration-150 group pr-2'
            key={director.id}
          >
            {director.name}
            <span className='group-last:hidden'>,</span>
          </Link>
        ))
      : null;

  if (!name && !photo) return null;
  return (
    <div className='flex flex-col gap-5 min-h-max border border-main/30 bg-dull/20 rounded-xl '>
      <Poster
        posterPath={photo}
        imageStyles='w-full h-full rounded-t-xl bg-cover '
        className='w-full aspect-square'
        alt={`episode ${num} still image`}
      />
      <div className='flex flex-col gap-3 pb-3 px-3'>
        <h4 className='text-white'>{name}</h4>
        <div className='flex items-center justify-between'>
          <p>Episode {num}</p>
          <p>{date}</p>
        </div>

        <p className='tracking-wide leading-7'>
          <span className='capitalize text-white/80'>overview:</span> {overview}
        </p>
        {directorNode ? <p>directed by: {directorNode}</p> : null}
      </div>
    </div>
  );
};
