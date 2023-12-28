import { IMG_URL } from '@/constants/data';
import Link from 'next/link';

type Props = {
  id: number;
  picture: string;
  name: string;
};
export default function Person({ picture, name, id }: Props) {
  const image = picture ? `${IMG_URL}${picture}` : '/unknown.webp';
  return (
    <Link
      href={`/people/${id}`}
      style={{
        background: `url(${image})`,
      }}
      className={`hero relative justify-end flex flex-col min-h-[16rem] rounded-lg text-white overflow-x-hidden w-full`}
    >
      <div className='bg-black/50 w-full px-5 py-3'>
        <p className='text-center truncate'>{name}</p>
      </div>
    </Link>
  );
}
