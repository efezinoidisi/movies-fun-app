'use client';
import { fetchClientList } from '@/utils/fetchList';
import Section from './section';
import { useQueries } from '@tanstack/react-query';
import Fallback from '../loaders/fallback';

const moviesEndpoint = 'movie/upcoming';
const seriesEndpoint = 'tv/popular';
const trendingSeriesEndpoint = 'trending/tv/day';

export default function Lists() {
  const queries = [
    {
      key: ['tv', 'trending'],
      endpoint: trendingSeriesEndpoint,
    },
    {
      key: ['movies', 'upcoming'],
      endpoint: moviesEndpoint,
    },
    {
      key: ['tv', 'popular'],
      endpoint: seriesEndpoint,
    },
  ];

  const [
    { data: trendingSeries, isFetching: fetchingTrendingSeries },
    { data: upcomingMovies, isFetching: fetchingUpmcomingMovies },
    { data: popularSeries, isFetching: fetchingPopularSeries },
  ] = useQueries({
    queries: queries.map(({ key, endpoint }) => ({
      queryKey: key,
      queryFn: () => fetchClientList(endpoint),
    })),
  });

  if (
    fetchingPopularSeries ||
    fetchingTrendingSeries ||
    fetchingUpmcomingMovies
  )
    return <Fallback />;

  const listItems: {
    id: number;
    variant: 'new' | 'popular' | 'movie';
    results: MovieList[];
    href: string;
    title: string;
    type: 'movie' | 'tv';
  }[] = [
    {
      id: 0,
      variant: 'new',
      results: trendingSeries?.results,
      href: '/tv?tab=trending',
      title: 'trending tv shows',
      type: 'movie',
    },
    {
      id: 1,
      variant: 'new',
      results: upcomingMovies?.results,
      href: '/movies?tab=upcoming',
      title: 'upcoming movies',
      type: 'movie',
    },
    {
      id: 2,
      variant: 'new',
      results: popularSeries?.results,
      href: '/tv?tab=popular',
      title: 'popular tv shows',
      type: 'tv',
    },
  ];

  return (
    <div className='w-11/12 mx-auto flex flex-col gap-y-10'>
      {listItems.map((item) => {
        return <Section key={item.id} {...item} />;
      })}
    </div>
  );
}
