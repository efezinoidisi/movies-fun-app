import { IMG_URL } from '@/constants/data';
import { fetchList } from '@/utils/fetchList';
import HeaderContent from './components/HeaderContent';
import { getTrailerKey } from '@/utils/helpers';

type Props = {
  params: { movieId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({
  params: { movieId },
  searchParams,
}: Props) {
  const type = searchParams?.type ?? ('movie' as string);
  const movieData: Promise<MovieDetail> = await fetchList(
    `${type}/${movieId}?append_to_response=videos,credits,recommendations,reviews,similar`
  );

  const {
    id,
    backdrop_path,
    credits,
    recommendations,
    similar,
    videos,
    title,
    reviews,
    release_date,
    genres,
  } = await movieData;

  const date = new Date(release_date);
  const releaseYear = date.getFullYear();

  const trailerKey = getTrailerKey(videos.results);

  return (
    <main className=''>
      <header
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),url(${IMG_URL}${backdrop_path})`,
        }}
        className='relative header text-white h-[70vh] flex flex-col justify-end px-5 md:px-16 py-10 md:py-14'
      >
        <HeaderContent
          title={title}
          genres={genres}
          releaseYear={releaseYear}
          trailer={trailerKey as string}
          id={id}
          type={type as string}
        />
      </header>
    </main>
  );
}
