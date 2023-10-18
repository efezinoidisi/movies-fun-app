import { IMG_URL } from '@/constants/data';
import getPlaceholder from '@/utils/placeholder';
import Image from 'next/image';

type Props = {
  path: string;
  size?: number;
  className: string;
  alt?: string;
};

export default async function ImageWithPlaceholder({
  path,
  size = 0,
  alt = '',
  ...otherProps
}: Props) {
  const imgUrl = `${IMG_URL}${path}`;
  const placeholder = await getPlaceholder(imgUrl);
  return (
    <Image
      src={imgUrl}
      alt={alt}
      width={size}
      height={size}
      placeholder={placeholder ? 'blur' : 'empty'}
      blurDataURL={placeholder?.base64}
      {...otherProps}
    />
  );
}
