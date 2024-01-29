import CloseModal from '@/components/modal/close-modal';
import { fetchList } from '@/utils/fetchList';
import { getTrailerKey } from '@/utils/helpers';

export default async function page({
  searchParams,
}: {
  searchParams: { k?: string; movieId: string; title: string };
}) {
  const { k = '', movieId, title } = searchParams;
  let key = k;

  if (!k && movieId) {
    const data = await fetchList(`movie/${movieId}/videos`);
    key = getTrailerKey(data.results) as string;
  }

  return (
    <>
      <CloseModal />
      {key ? (
        <iframe
          height={500}
          src={`https://www.youtube.com/embed/${key}?autoplay=1`}
          title={title}
          allowFullScreen
          className='w-full rounded-2xl'
        ></iframe>
      ) : (
        <div className='md:w-1/2 h-full  min-h-[50vh] flex justify-center items-center flex-col gap-5'>
          <p className='capitalize text-lg text-white'>no trailer found😢</p>
          <CloseModal
            style='relative text-xl flex items-center gap-2 border px-5 py-1 rounded-lg border-red-600 mt-2'
            text='back'
          />
        </div>
      )}
    </>
  );
}
