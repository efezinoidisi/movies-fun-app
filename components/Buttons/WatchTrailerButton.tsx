'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import VideoModal from '../modals/VideoModal';
import Link from 'next/link';
import { updateUrlParam } from '@/utils/helpers';
import { AiFillPlayCircle } from 'react-icons/ai';

export default function WatchTrailerButton({
  videoKey = '',
  path = '',
}: {
  videoKey?: string;
  path?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const closeModal = () => {
    const updatedValue = updateUrlParam(searchParams, {
      type: 'delete',
      key: 'video_modal',
    });
    router.push(pathname + updatedValue);
  };
  const showModal = searchParams.get('video_modal');

  return (
    <>
      <Link
        href={`${path}?video_modal=true`}
        className='bg-cGreen py-2 md:py-3 text-sm md:text-lg capitalize px-2 md:px-7 rounded-lg flex gap-2 items-center'
      >
        <AiFillPlayCircle className='text-3xl' />
        watch trailer
      </Link>
      {showModal && <VideoModal closeModal={closeModal} videoKey={videoKey} />}
    </>
  );
}
