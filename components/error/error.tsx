'use client';
import Button from '../Button';
import { useRouter } from 'next/navigation';

export default function Error({ message = '' }: { message?: string }) {
  const { back } = useRouter();
  const goBack = () => {
    back();
  };
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center gap-5'>
      <h2 className='text-2xl'>An error occurred</h2>
      {message ? <p className='capitalize text-white'>{message}</p> : null}
      <Button
        className='bg-dull text-dullText px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-300 ease-in-out hover:text-white capitalize'
        onClick={goBack}
      >
        go back
      </Button>
    </div>
  );
}
