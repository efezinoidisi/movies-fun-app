import MoviePoster from '@/components/common/movie-poster';
import { GENDERS } from '@/constants/data';
import { fetchList } from '@/utils/fetchList';
import { checkTrimString, getReleaseDate } from '@/utils/helpers';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

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

  const date = new Date();
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

  return (
    <section className='pt-20 px-5 w-full md:w-5/6 mx-auto'>
      <h2 className='text-white text-center mb-5 text-xl'>{name || ''}</h2>
      <div className='grid md:grid-cols-2 place-items-stretch  gap-y-4'>
        <MoviePoster
          posterPath={profile_path}
          className='w-full border border-accent rounded-lg max-w-xs'
          imageStyles='w-full h-full rounded-lg'
        />
        <div>
          <p className='mb-4'>{biography}</p>

          {details.map(({ title, value }) => {
            if (!value) return null;
            return (
              <div className='flex items-start py-2' key={title}>
                <p className='min-w-[9rem]'>{title}</p>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <section className='flex flex-col gap-y-10 w-full md:w-3/4 mx-auto py-5'>
        <Table type='movies' items={movie_credits?.cast} caption='movies' />
        <Table type='tv' items={tv_credits?.cast} caption='television' />
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
      const release = `${new Date(item.first_air_date).getFullYear()}` ?? '-';
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
      const release = `${new Date(movie.release_date).getFullYear()}` ?? '-';
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
      <caption className='caption-top capitalize  border-b-2 py-3 text-white'>
        {caption}
      </caption>
      <thead className=''>
        <tr className='border border-b-0 py-4 grid grid-cols-5 w-full border-text/80 uppercase font-mono tracking-wider'>
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
      <td className='col-span-5 border-t border-t-body px-5 pt-2'>
        {displayedOverview}
      </td>
    </tr>
  );
};
