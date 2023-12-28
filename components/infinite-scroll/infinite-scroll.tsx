'use client';
import { fetchClientList } from '@/utils/fetchList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { merge } from '@/utils/merge';
import Loader from '../loaders/loader';
import Ring from '../loaders/ring';
import NewReleaseCard from '../Cards/NewRelease';
import MovieCard from '../Cards/MovieCard';

type Props = {
  endpoint: string;
  passkey: string[];
  title?: string;
  type?: 'movie' | 'tv' | 'person';
};

export default function InfiniteScroll(props: Props) {
  const { endpoint, passkey, title, type = 'movie' } = props;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: passkey,
      queryFn: ({ pageParam = 1 }) => fetchClientList(endpoint, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage?.page === lastPage?.total_pages) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      staleTime: Infinity,
    });

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastNodeRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((movies) => {
        if (movies[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === 'pending')
    return (
      <div className='flex flex-col items-center'>
        <Ring />
      </div>
    );

  if (status === 'error') return <p>An error occurred please try again!</p>;

  const content = data?.pages?.map((pg) => {
    return pg?.results?.map((movie: MovieList) => {
      return <MovieCard key={movie.id} {...movie} />;
    });
  });

  return (
    <section>
      {title && (
        <h2 className='text-white font-bold capitalize mb-5'>{title}</h2>
      )}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 sl:grid-cols-3 gap-2 gap-y-4 sl:gap-7 md:gap-5'>
        {content}
      </div>
      <div
        className={merge(
          `invisible flex flex-col items-center`,

          isFetchingNextPage && 'visible'
        )}
        aria-hidden={true}
        ref={lastNodeRef}
      >
        <Loader background='bg-accent/80' />
      </div>
    </section>
  );
}
