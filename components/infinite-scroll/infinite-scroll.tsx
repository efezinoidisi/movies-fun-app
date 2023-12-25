'use client';
import { fetchClientList } from '@/utils/fetchList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from '../Cards/MovieCard';
import { merge } from '@/utils/merge';
import SimpleLoader from '../loaders/SimpleLoader';

type Props = {
  endpoint: string;
  key: string;
  title?: string;
};

export default function InfiniteScroll(props: Props) {
  const { endpoint, key, title } = props;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [key],
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
      <p className='animate-spin' color='#0077e6'>
        loading
      </p>
    );

  if (status === 'error') return <p>An error occurred please try again!</p>;

  const content = data?.pages?.map((pg) => {
    return pg?.results?.map((movie: MovieList) => {
      return <MovieCard key={movie.id} {...movie} type={movie.media_type} />;
    });
  });

  return (
    <section>
      <h2>{title}</h2>
      <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-y-7 gap-x-3'>
        {content}
      </div>
      <div
        className={merge(
          `invisible `,

          isFetchingNextPage && 'visible'
        )}
        aria-hidden={true}
        ref={lastNodeRef}
      >
        <SimpleLoader />
      </div>
    </section>
  );
}
