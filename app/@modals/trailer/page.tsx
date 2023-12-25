import CloseModal from '@/components/Buttons/close-modal';
import { fetchList } from '@/utils/fetchList';
import { getTrailerKey } from '@/utils/helpers';

export default async function page({
  searchParams,
}: {
  searchParams: { videoKey?: string; movieId: string };
}) {
  const { videoKey = '', movieId } = searchParams;
  let key = videoKey || '';

  if (!videoKey) {
    const data = await fetchList(`movie/${movieId}/videos`);
    key = getTrailerKey(data.results) as string;
  }

  return (
    <section className='fixed left-1/2 top-1/2 h-auto w-11/12 z-50 -translate-x-1/2 -translate-y-1/2 bg-black flex flex-col text-white bg-opacity-50 md:w-4/5 rounded-m-lg'>
      <CloseModal />
      <iframe
        height={500}
        src={`https://www.youtube.com/embed/${key}?&autoplay=1`}
        title='YouTube video player'
        allowFullScreen
        className='w-full'
      ></iframe>
    </section>
  );
}
