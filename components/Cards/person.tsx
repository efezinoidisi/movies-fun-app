import { IMG_URL } from '@/constants/data';
import Link from 'next/link';

type Props = {
  id: number;
  picture: string;
  name: string;
  character?: string;
};
export default function Person({ picture, name, id, character }: Props) {
  const image = picture ? `${IMG_URL}${picture}` : '/unknown.webp';
  return (
    <Link
      href={`/people/${id}`}
      style={{
        background: `url(${image})`,
      }}
      prefetch={false}
      className={`hero relative justify-end flex flex-col min-h-[16rem] rounded-lg  overflow-x-hidden w-full mr-10 border border-accent/50 hover:scale-y-105`}
    >
      <div className='bg-black/60 w-full px-5 py-4'>
        <p className='text-center truncate text-white font-bold capitalize tracking-wide'>
          {name}
        </p>
        {character && (
          <p className='text-sm text-center text-white/80'>{character}</p>
        )}
      </div>
    </Link>
  );
}
