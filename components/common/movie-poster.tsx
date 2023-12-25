import { IMG_URL } from '@/constants/data';
import { merge } from '@/utils/merge';
import Image from 'next/image';

type Props = {
  posterPath: string;
  className?: string;
};

export default function MoviePoster({ posterPath, className = '' }: Props) {
  return (
    <div className={merge(className || 'w-full  overflow-hidden h-80 sl:h-64')}>
      <Image
        src={`${IMG_URL}${posterPath}`}
        alt=''
        width={0}
        height={0}
        sizes='100vw 100%'
        className='w-full h-full rounded-lg'
      />
    </div>
  );
}
