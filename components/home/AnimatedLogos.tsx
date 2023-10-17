import ImageLoader from '@/components/ImageLoader';
import { fetchList } from '@/utils/fetchList';

export default async function AnimatedLogos() {
  const movieProvidersEndpoint = 'watch/providers/movie';
  const moviesData: Promise<{ results: WatchProvider[] }> = fetchList(
    movieProvidersEndpoint
  );

  const { results } = await moviesData;
  const filteredResults = results.filter(
    (result) => result.display_priority < 10
  );

  return (
    <section className='mt-5 px-2'>
      <div className='overflow-hidden h-28 w-full relative flex flex-col items-center justify-center'>
        <ul className='flex overflow-hidden h-[100px] w-ml animate-brands gap-5 '>
          {filteredResults.map((result) => {
            return (
              <li key={result.provider_id} className='w-[200px] h-28'>
                <ImageLoader
                  img={result.logo_path}
                  alt=''
                  size={450}
                  height={100}
                  className='w-full object-contain rounded-3xl'
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
