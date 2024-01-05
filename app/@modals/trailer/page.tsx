import CloseModal from '@/components/modal/close-modal';
import { fetchList } from '@/utils/fetchList';
import { getTrailerKey } from '@/utils/helpers';

export default async function page({
  searchParams,
}: {
  searchParams: { k?: string; movieId: string; title: string };
}) {
  const { k = '', movieId, title } = searchParams;
  let key = k || '';

  if (!k) {
    const data = await fetchList(`movie/${movieId}/videos`);
    key = getTrailerKey(data.results) as string;
  }

  return (
    <>
      <CloseModal />
      <iframe
        height={500}
        src={`https://www.youtube.com/embed/${key}?autoplay=1`}
        title={title}
        allowFullScreen
        className='w-full rounded-2xl'
      ></iframe>
    </>
  );
}
