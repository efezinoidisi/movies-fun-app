import { getReleaseDate, numberToDollarString } from '@/utils/helpers';
import GenreList from './genre-list';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';
import Icons from '@/lib/icons';
import Rating from './rating';

type Common = {
  runtime: string;
  overview: string;
  language: string;
  genres: Genre[];
  poster: string;
  name: string;
  rating: number;
};

type Tv = Common & {
  type: 'tv';
  first_episode: string;
  last_episode: string;
  status: string;
  seasons: number;
  episodes: number;
  creator: string;
};

type Movie = Common & {
  type: 'movie';
  release: string;
  director: string;
  budget: number;
  revenue: number;
};

type Props = Movie | Tv;

export default function Details(props: Props) {
  const { overview, type, language, genres, runtime, poster, name, rating } =
    props;
  let items: { name: string; value: string | React.ReactNode | number }[] = [
    {
      name: 'language',
      value: language,
    },
    {
      name: 'runtime',
      value: runtime || '-',
    },
    {
      name: 'rating',
      value: <Rating rating={rating} />,
    },
  ];
  if (type === 'movie') {
    const { release, director, budget, revenue } = props;
    items = [
      ...items,
      {
        name: 'director',
        value: director,
      },
      {
        name: 'release',
        value: getReleaseDate(release) || '-',
      },

      {
        name: 'budget',
        value: budget ? numberToDollarString(budget) : '-',
      },
      {
        name: 'revenue',
        value: revenue ? numberToDollarString(revenue) : '-',
      },
    ];
  } else {
    const { seasons, status, episodes, first_episode, last_episode, creator } =
      props;
    items = [
      ...items,
      {
        name: 'creator',
        value: creator,
      },
      {
        name: 'first episode',
        value: getReleaseDate(first_episode),
      },
      {
        name: 'last episode',
        value: getReleaseDate(last_episode),
      },
      {
        name: 'seasons',
        value: seasons,
      },
      {
        name: 'episodes',
        value: episodes,
      },
      {
        name: 'status',
        value: status,
      },
    ];
  }

  const picture = poster ? (
    <Image
      src={`${IMG_URL}${poster}`}
      width={500}
      height={500}
      className=' w-full h-full rounded-lg'
      alt={`profile of ${name}`}
    />
  ) : (
    <Icons.person className=' w-full h-full rounded-lg' />
  );

  return (
    <article className=' flex flex-col gap-y-3 md:gap-y-5 justify-start items-start'>
      <h2 className='capitalize text-xl font-semibold py-3 text-white'>
        overview
      </h2>
      <p>{overview}</p>
      <GenreList genres={genres} type='with-id' page={type} />
      <div className='grid md:grid-cols-2 justify-items-center md:justify-items-stretch gap-y-5 w-full mt-4'>
        <div>
          {items.map(({ name, value }) => {
            return (
              <div className='py-2 flex gap-x-10 items-start' key={name}>
                <p className={`min-w-[6rem] md:min-w-[8rem] capitalize`}>
                  {name}
                </p>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
        <div className='w-full border border-accent rounded-lg max-w-xs'>
          {picture}
        </div>
      </div>
    </article>
  );
}
