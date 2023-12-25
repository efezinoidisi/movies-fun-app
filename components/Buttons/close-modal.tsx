'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button';
import Icons from '@/lib/icons';

export default function CloseModal() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <Button
      onClick={goBack}
      className='absolute right-5 bg-black bg-opacity-50'
    >
      <Icons.close className={'text-4xl text-white'} />
    </Button>
  );
}
