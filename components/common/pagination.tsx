import Link from 'next/link';

type Props = {
  totalPages: number;
  page: number;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Pagination({ totalPages, page, searchParams }: Props) {
  return (
    <div className='flex gap-5 w-2/5 mx-auto items-center px-8 md:px-20 py-2 mt-7'>
      <Link
        href={{
          pathname: '/search',
          query: { ...searchParams, page: Number(page) - 1 },
        }}
        className={`${
          Number(page) === 1 ? 'pointer-events-none opacity-50' : ''
        } border px-3 py-2 rounded-sm capitalize border-dull bg-dull text-dullText hover:bg-body transition-colors ease-in-out duration-200 hover:scale-105`}
      >
        prev
      </Link>
      <span className='text-sm min-w-max'>{`${page} of ${totalPages}`}</span>
      <Link
        href={{
          pathname: '/search',
          query: { ...searchParams, page: Number(page) + 1 },
        }}
        className={`${
          Number(page) === totalPages ? 'pointer-events-none opacity-50' : ''
        } border px-3 py-2 capitalize border-dull bg-dull text-dullText hover:bg-body transition-colors ease-in-out duration-200 hover:scale-105 rounded-sm`}
      >
        next
      </Link>
    </div>
  );
}
