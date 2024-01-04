import Poster from '@/components/common/poster';
import MoviePoster from '@/components/common/poster';
import { GENDERS } from '@/constants/data';
import { fetchList } from '@/utils/fetchList';
import { checkTrimString, getReleaseDate } from '@/utils/helpers';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props) {
  const person = await fetchList(`person/${id}`);

  return {
    title: person.name,
    description: `explore public information about ${person.name}`,
  };
}

export default async function page({ params: { id } }: Props) {
  const endpoint = `person/${id}?append_to_response=images,tv_credits,movie_credits`;

  const person: Promise<PersonDetail> = await fetchList(endpoint);

  const {
    name,
    tv_credits,
    movie_credits,
    images,
    profile_path,
    place_of_birth,
    also_known_as,
    deathday,
    biography,
    birthday,
    gender,
  } = await person;

  const movieCredits = movie_credits?.cast;

  movieCredits.sort((a, b) => {
    const dateA = getReleaseDate(a.release_date, 'short');

    const dateB = getReleaseDate(b.release_date, 'short');

    return +dateA - +dateB;
  });

  const tvCredits = tv_credits?.cast;

  tvCredits.sort((a, b) => {
    const dateA = getReleaseDate(a.first_air_date, 'short');

    const dateB = getReleaseDate(b.first_air_date, 'short');

    return +dateA - +dateB;
  });

  const details = [
    {
      title: 'also known as',
      value: also_known_as.toString(),
    },
    {
      title: 'birthday',
      value: getReleaseDate(birthday),
    },
    {
      title: 'deathday',
      value: deathday ? getReleaseDate(deathday) : null,
    },
    {
      title: 'birth place',
      value: place_of_birth,
    },
    {
      title: 'gender',
      value: GENDERS[gender],
    },
  ];

  const profiles = images?.profiles?.slice(0, 10);

  return (
    <section className='w-11/12 mx-auto'>
      <div className='py-16'></div>
      <h2 className='text-white text-center mb-5 text-xl md:text-start'>
        {name || ''}
      </h2>
      <div className='grid md:grid-cols-3 gap-y-4 md:place-items-start gap-x-6 place-items-center'>
        <div className='md:col-span-2'>
          <p className='mb-4 tracking-wide leading-6 md:leading-7 lg:leading-8'>
            {biography}
          </p>

          {details.map(({ title, value }) => {
            if (!value) return null;
            return (
              <div className='flex items-start py-2' key={title}>
                <p className='min-w-[10rem] capitalize'>{title}</p>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
        <MoviePoster
          posterPath={profile_path}
          className='w-full border border-accent rounded-lg max-w-xs row-start-1 md:col-start-3 md:col-span-1'
          imageStyles='w-full h-full rounded-lg'
        />
      </div>
      <section className='flex flex-col gap-3 my-5 md:my-10'>
        <h3 className='capitalize text-white text-xl font-bold mb-7'>
          featured images
        </h3>
        <div className='flex gap-3 flex-wrap'>
          {profiles?.length > 0 &&
            profiles.map((profile) => {
              return (
                <Poster
                  type='person'
                  posterPath={profile.file_path}
                  key={profile.iso_639_1}
                  className='w-32'
                  imageStyles='border border-dull w-32 rounded-lg'
                />
              );
            })}
        </div>
      </section>

      <section className='flex flex-col gap-y-5 w-full md:5/6 lg::w-3/4 mx-auto py-5'>
        <h3 className='capitalize text-white text-xl font-bold'>filmography</h3>
        {movieCredits.length > 0 && (
          <Table type='movies' items={movieCredits} caption='movies' />
        )}
        {tvCredits.length > 0 && (
          <Table type='tv' items={tvCredits} caption='television' />
        )}
      </section>
    </section>
  );
}

type TableProps =
  | {
      type: 'tv';
      items: CastTv[];
      caption: string;
    }
  | {
      type: 'movies';
      items: CastMovie[];
      caption: string;
    };

const Table = (props: TableProps) => {
  const { type, items, caption } = props;

  let content;

  if (type === 'tv') {
    content = items.map((item) => {
      const release = getReleaseDate(item.first_air_date, 'short');
      return (
        <Credit
          key={item.id}
          character={item.character}
          name={item.name}
          overview={item.overview}
          id={item.id}
          credit_id={item.credit_id}
          release={release}
          type='tv'
        />
      );
    });
  } else {
    content = items?.map((movie) => {
      const release = getReleaseDate(movie.release_date, 'short');
      return (
        <Credit
          key={movie.id}
          character={movie.character}
          name={movie.title}
          overview={movie.overview}
          id={movie.id}
          credit_id={movie.credit_id}
          release={release}
          type='movies'
        />
      );
    });
  }
  return (
    <table className='table-fixed'>
      <caption className='caption-top uppercase  border-b-4 py-3 text-white/90 font-medium tracking-wider text-lg border-pink-500'>
        {caption}
      </caption>
      <thead className=''>
        <tr className='border border-t-pink-500 border-b-0 py-4 grid grid-cols-5 w-full border-text/80 uppercase font-mono tracking-wider text-sm md:text-base'>
          <th className='border-r border-dull text-center py-2 col-span-1'>
            year
          </th>
          <th className='border-r border-dull text-center py-2 col-span-2'>
            title
          </th>
          <th className=' border-dull text-center py-2 col-span-2'>role</th>
          {/* <th className='hidden md:inline-block'>overview</th> */}
        </tr>
      </thead>
      <tbody className=''>{content}</tbody>
    </table>
  );
};

type CreditProps = {
  id: number;
  name: string;
  release: string;
  overview: string;
  character: string;
  credit_id: string;
  type: 'movies' | 'tv';
};
const Credit = (props: CreditProps) => {
  const { id, name, release, overview, character, credit_id, type } = props;

  const path = `/${type}/${id}`;
  const displayedOverview = checkTrimString(overview, 150);
  return (
    <tr className='border py-3 grid grid-cols-5 w-full border-text/80'>
      <td className='col-span-1 border-r border-dull text-center py-2'>
        {release}
      </td>

      <td className='col-span-2 border-r border-dull text-center py-2'>
        <Link href={path} className='text-accent'>
          {name}
        </Link>
      </td>
      <td className='col-span-2 text-center py-2'>{character || '-'}</td>
      <td className='col-span-5 border-t border-t-body px-5 pt-2 leading-7'>
        {displayedOverview}
      </td>
    </tr>
  );
};
