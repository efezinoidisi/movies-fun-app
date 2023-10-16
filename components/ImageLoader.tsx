'use client';

import { IMG_URL } from '@/constants/data';
import Image, { ImageLoaderProps } from 'next/image';

type Props = {
  size?: number;
  img: string;
  alt: string;
  className?: string;
  height?: number;
  placeholder?: string;
};

export default function ImageLoader(props: Props) {
  const { size = 0, img, alt, height, placeholder = '', ...others } = props;
  const imageLoader = ({ src }: ImageLoaderProps) => {
    return `${IMG_URL}${src}`;
  };
  return (
    <Image
      loader={imageLoader}
      src={img}
      alt={alt}
      width={size}
      height={height || size}
      sizes={`{${size ? '' : '100vw 100%'} `}
      placeholder={placeholder ? 'blur' : 'empty'}
      blurDataURL={placeholder}
      {...others}
    />
  );
}
