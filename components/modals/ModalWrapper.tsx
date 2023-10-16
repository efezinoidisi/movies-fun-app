import { ReactNode } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function ModalWrapper({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) {
  return (
    <dialog className='block h-screen bg-[#cccccc] relative'>
      <div
        className='fixed left-0 top-0 right-0 bottom-0 h-auto w-full bg-white z-20 bg-opacity-50'
        onClick={closeModal}
      />
      <div className='fixed left-1/2 top-1/2 h-auto w-11/12 z-50 -translate-x-1/2 -translate-y-1/2 bg-black flex flex-col text-white bg-opacity-50 md:w-4/5 rounded-m=lg'>
        <button
          className='self-end absolute md:right-3 top-0 right-0 md:top-5'
          onClick={closeModal}
        >
          <AiFillCloseCircle className={'text-3xl'} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
