import { IMG_URL } from '@/constants/data';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import Image from 'next/image';

type Props = {
  posterPath: string;
  className?: string;
  imageStyles?: string;
};

export default function MoviePoster({
  posterPath,
  className = 'w-full  overflow-hidden h-80 sl:h-64',
  imageStyles = 'w-full h-full rounded-t-lg bg-cover',
}: Props) {
  const picture = posterPath ? (
    <Image
      src={`${IMG_URL}${posterPath}`}
      alt=''
      width={500}
      height={600}
      className={imageStyles}
    />
  ) : (
    <Icons.unknown className={merge('border-b border-text/50', imageStyles)} />
  );
  return <div className={merge('aspect-[2/3]', className)}>{picture}</div>;
}
