import AddWatchlistButton from '@/components/Buttons/AddWatchlistButton';
import WatchTrailerButton from '@/components/Buttons/WatchTrailerButton';

type Props = {
  title: string;
  releaseYear: string;
  genres: {
    id: number;
    name: string;
  }[];
  trailer: string;
  id: number;
  type: string;
};

export default function HeaderContent(props: Props) {
  const { title, releaseYear, genres, trailer, id, type } = props;

  return (
    <div className='flex flex-col gap-3'>
      <span className='rounded-xl bg-body px-2  capitalize text-xs font-mono leading-8 tracking-wider w-fit'>
        {type}
      </span>
      <h2>{title}</h2>
      <ul className='list-inside list-disc flex gap-2'>
        <li className='first:list-none'>{releaseYear}</li>

        {genres.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
      <div className='flex items-center gap-3'>
        <WatchTrailerButton videoKey={trailer} />
        <AddWatchlistButton id={id} />
      </div>
    </div>
  );
}
