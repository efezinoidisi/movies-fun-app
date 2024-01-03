'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();
  return (
    <main className='pt-20 min-h-[80vh] flex flex-col justify-center items-center'>
      <h2 className='text-4xl md:text-5xl'>404 Error</h2>
      <p>link not found</p>
      <Button onClick={back} className='bg-dull text-dullText p-2 capitalize'>
        go back
      </Button>
    </main>
  );
}
