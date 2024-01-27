import { merge } from '@/utils/merge';
import Ellipsis from './ellipsis';

type Props = {
  extraStyles?: string;
};

const Fallback = ({ extraStyles = '' }: Props) => {
  return (
    <div className={merge('flex justify-center items-center', extraStyles)}>
      <Ellipsis />
    </div>
  );
};

export default Fallback;
