'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';

type CloseModalProps = {
  style?: string;
  text?: string;
};

export default function CloseModal(props: CloseModalProps) {
  const { style = '', text = '' } = props;
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <Button
      onClick={goBack}
      className={merge(
        'absolute -left-1 bg-black/50 -top-3 text-2xl p-2 rounded-full group',
        style
      )}
    >
      {text ? (
        <span className='group-hover:text-opacity-50 text-red-500 capitalize'>
          {text}
        </span>
      ) : (
        <Icons.close className={'  group-hover:fill-red-400/70'} />
      )}
    </Button>
  );
}
