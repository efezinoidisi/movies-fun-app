import AuthCard from '@/components/Cards/auth-card';
import { fetchList } from '@/utils/fetchList';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = 'trending/movie/day';
  const moviesData: Promise<FetchData> = await fetchList(`${endpoint}`);

  const { results } = await moviesData;
  return (
    <div className='bg-gradient-to-r from-rose-100 to-teal-100 grid  md:grid-cols-2 min-h-screen text-text'>
      {children}
      <AuthCard movies={results} />
    </div>
  );
}
