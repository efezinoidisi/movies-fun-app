'use client';

import useMovies from 'hooks/useMovies';

export default function Test() {
  const { results: da } = useMovies({
    page: 1,
    endpoint: 'trending/movie/day',
  });
  return <div>Test</div>;
}
