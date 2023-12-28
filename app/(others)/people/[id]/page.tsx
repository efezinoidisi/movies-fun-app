import MoviePoster from '@/components/common/movie-poster';
import { fetchList } from '@/utils/fetchList';

type Props = {
  params: { id: string };
};

export default async function page({ params: { id } }: Props) {
  const endpoint = `person/${id}?append_to_response=images,combined_credits,`;

  const person: Promise<PersonDetail> = await fetchList(endpoint);

  const {
    name,
    combined_credits,
    images,
    profile_path,
    place_of_birth,
    also_known_as,
    deathday,
    biography,
    birthday,
  } = await person;

  return (
    <section className='pt-20 px-5'>
      <div className='grid md:grid-cols-2'>
        <MoviePoster posterPath={profile_path} />
        <div>
          <div className='flex items-start'>
            <p className='min-w-[9rem]'>also known as</p>
            <p>{also_known_as.toString()}</p>
          </div>
          <div className='flex items-start'>
            <p className='min-w-[9rem]'>name</p>
            <p>{name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
