import Icons from '@/lib/icons';

type Props = {
  ratings: number | null;
};

export default function Ratings({ ratings }: Props) {
  const stars = Array.from({ length: 10 }, (_, index) => {
    return (
      <Icons.star
        className={`${ratings && ratings > index ? 'text-yellow-500' : ''}`}
        key={index}
      />
    );
  });
  return (
    <div className='flex items-center gap-1'>
      {ratings?.toFixed(1)}
      <span className='flex'>{stars}</span>
    </div>
  );
}
