import { IMG_URL } from '@/constants/data';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import getPlaceholder from '@/utils/placeholder';
import Image from 'next/image';

type Props = {
  posterPath: string;
  className?: string;
  imageStyles?: string;
  alt?: string;
  type?: 'movie' | 'person';
  width?: number;
  height?: number;
};

export default async function Poster({
  posterPath,
  className = 'w-full  overflow-hidden h-80 sl:h-64',
  imageStyles = 'w-full h-full rounded-t-lg bg-cover',
  alt = '',
  type = 'movie',
  width = 500,
  height = 600,
}: Props) {
  const placeholder = posterPath ? await getPlaceholder(posterPath) : '';
  const picture = posterPath ? (
    <Image
      src={`${IMG_URL}${posterPath}`}
      alt={alt}
      width={width}
      height={height}
      className={imageStyles}
      unoptimized
      placeholder={placeholder ? 'blur' : 'empty'}
      blurDataURL={placeholder ? placeholder.base64 : ''}
    />
  ) : type === 'movie' ? (
    <Icons.unknown className={merge('border-b border-text/30', imageStyles)} />
  ) : (
    <Icons.person className={merge('border-b border-text/50', imageStyles)} />
  );
  return <div className={merge('aspect-[2/3]', className)}>{picture}</div>;
}
