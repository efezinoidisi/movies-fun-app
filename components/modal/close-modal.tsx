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
      className='absolute -left-1 bg-black/50 -top-3 text-2xl p-2 rounded-full group '
    >
      <Icons.close className={' fill-white/50 group-hover:fill-red-400/70'} />
    </Button>
  );
}
