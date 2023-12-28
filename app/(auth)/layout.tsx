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
    <div className='grid  md:grid-cols-2 min-h-screen pb-20 md:pb-5'>
      {children}
      <AuthCard movies={results} />
    </div>
  );
}
