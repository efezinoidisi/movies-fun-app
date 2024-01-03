'use client';
import { useRouter } from 'next/navigation';

export default function ModalOverlay() {
  const { back } = useRouter();
  return (
    <div
      className='fixed inset-0 h-auto w-full bg-black z-20 bg-opacity-50'
      onClick={back}
    ></div>
  );
}
