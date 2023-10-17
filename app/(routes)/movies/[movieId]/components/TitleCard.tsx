import SimpleSlider from '@/components/Slider/SimpleSlider';

type Props = {
  movies: MovieList[];
  type: 'movie' | 'tv';
  title: string;
  id: number;
};

export default function TitleCard({ movies, type, title }: Props) {
  return (
    <div>
      <h2 className='font-semibold text-xl capitalize'>{title}</h2>
      <SimpleSlider items={movies} type={type} />
    </div>
  );
}
