'use client';
import Button from '../Button';
import { useRouter } from 'next/navigation';

export default function Error({ message = '' }: { message?: string }) {
  const { back } = useRouter();

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center gap-5'>
      <h2 className='text-2xl'>An error occurred</h2>
      {message ? <p className='capitalize text-white'>{message}</p> : null}
      <div className='flex items-center gap-5'>
        <Button
          className='bg-dull text-dullText px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-300 ease-in-out text-white capitalize'
          onClick={back}
        >
          go back
        </Button>
        {/* <Button
          className='bg-green-600 text-dullText px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-300 ease-in-out text-white capitalize'
          onClick={refresh}
        >
          refresh
        </Button> */}
      </div>
    </div>
  );
}
