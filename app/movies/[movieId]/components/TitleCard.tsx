import SimpleSlider from '@/components/Slider/SimpleSlider';

type Props = {
  movies: MovieList[];
  type: 'movie' | 'tv';
  title: string;
  id: number;
};

export default function TitleCard({ movies, type, title }: Props) {
  if (movies.length === 0) return null;

  return (
    <div>
      <h2 className='font-semibold text-xl capitalize pb-10 text-center'>
        {title}
      </h2>
      <SimpleSlider items={movies} type={type} />
    </div>
  );
}
