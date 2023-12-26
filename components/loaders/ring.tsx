import { merge } from '@/utils/merge';

type Props = {
  customStyles?: string;
};

export default function Ring(props: Props) {
  const { customStyles = 'after:border-white' } = props;
  return (
    <div
      className={`inline-block w-20 h-20 after:content-[""] after:block after:w-16 after:h-16 after:m-2 after:rounded-[50%] outline-none after:border-4 after:border-r-transparent  after:border-l-transparent after:animate-ring ${customStyles}`}
    ></div>
  );
}
