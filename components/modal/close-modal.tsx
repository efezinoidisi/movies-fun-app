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
      className='absolute right-3 bg-black/50 top-3 text-2xl p-2 rounded-full'
    >
      <Icons.close className={' text-white'} />
    </Button>
  );
}
