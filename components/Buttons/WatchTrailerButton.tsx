import Icons from '@/lib/icons';
import Link from 'next/link';

export default function WatchTrailerButton({ path = '' }: { path?: string }) {
  return (
    <Link
      href={`${path}`}
      className='bg-cGreen py-2 md:py-3 text-sm min-w-max md:px-4 capitalize px-2  rounded-lg flex gap-2 items-center h-12'
    >
      <Icons.play className='text-3xl' />
      watch trailer
    </Link>
  );
}
