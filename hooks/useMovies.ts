'use client';
import { fetchClientList } from '@/utils/fetchList';
import { useState, useEffect } from 'react';
type Props = {
  page?: number;
  endpoint: string;
};

export default function useMovies(props: Props) {
  const { page = 1, endpoint } = props;

  const [results, setResults] = useState<MovieList[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    const controller = new AbortController();
    const { signal } = controller;

    fetchClientList(endpoint)
      .then((data: FetchData) => {
        setResults((prev) => [...prev, ...data.results]);
        setHasNextPage(page < data.total_pages);
      })
      .catch((err: Error) => {
        console.log(err);
        if (signal.aborted) return;
        setIsError(true);
        setError({
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [page, endpoint]);
  return { results, isLoading, isError, error, hasNextPage };
}
