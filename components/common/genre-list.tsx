import { GENRES } from '@/constants/data';
import { merge } from '@/utils/merge';
type GenreWithId = {
  type: 'with-id';
  genres: Genre[];
  styles?: string;
};

type GenreWithoutId = {
  type: 'without-id';
  genres: number[];
  styles?: string;
};
type Props = GenreWithId | GenreWithoutId;

export default function GenreList({ genres, type, styles = '' }: Props) {
  if (type === 'with-id')
    return (
      <ul
        className={merge(
          'list-inside list-disc flex gap-2 flex-wrap items-center',
          styles
        )}
      >
        {genres.map(({ id, name }) => {
          return (
            <li key={id} className='text-xs min-w-fit'>
              {name}
            </li>
          );
        })}
      </ul>
    );

  return (
    <ul className={merge('flex gap-2 min-w-max text-xs lowercase', styles)}>
      {genres.map((id) => {
        return (
          <li
            key={id}
            className='border even:border-e-blue-500
                  even:border-s-red-500
                  border-e-red-500
                  border-purple-500
                  border-s-blue-500 rounded-md px-1'
          >
            {GENRES[id]}
          </li>
        );
      })}
    </ul>
  );
}
