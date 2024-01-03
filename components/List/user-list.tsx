import Link from 'next/link';
import MediaItemCard from '@/components/Cards/media-item';
import { merge } from '@/utils/merge';

export default function UserList({
  list,
  title = '',
  link = '',
  styles = '',
}: {
  list: MediaItem[];
  title?: string;
  link?: string;
  styles?: string;
}) {
  return (
    <section className={merge('flex flex-col gap-5', styles)}>
      {title && (
        <h2 className='font-bold capitalize text-lg md:text-2xl text-white'>
          {title}
        </h2>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sl:grid-cols-3 gap-2 sl:gap-7 md:gap-5 gap-y-5'>
        {list.length > 0 ? (
          list.map((movie) => {
            return <MediaItemCard key={movie.id} {...movie} />;
          })
        ) : (
          <p className='place-self-center col-span-12'>nothing yet..</p>
        )}
      </div>
      {link ? (
        <Link
          href={link}
          className='self-end border border-body px-4 py-3 bg-body hover:bg-dull text-dullText'
        >
          view more
        </Link>
      ) : null}
    </section>
  );
}