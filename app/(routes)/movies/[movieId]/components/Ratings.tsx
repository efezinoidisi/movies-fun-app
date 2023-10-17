import { AiFillStar } from 'react-icons/ai';

type Props = {
  ratings: number | null;
};

export default function Ratings({ ratings }: Props) {
  const stars = Array.from({ length: 10 }, (_, index) => {
    return (
      <AiFillStar
        className={`${
          ratings && ratings > index ? 'text-yellow-500' : 'text-white'
        }`}
        key={index}
      />
    );
  });
  return <div className='flex'>{stars}</div>;
}
