import ModalOverlay from '@/components/modal/modal-overlay';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ModalOverlay />
      <section className='fixed left-1/2 top-1/2 h-auto w-11/12 z-50 -translate-x-1/2 -translate-y-1/2 bg-black flex flex-col text-white bg-opacity-50 md:w-4/5 rounded-m-lg rounded-2xl'>
        {children}
      </section>
    </div>
  );
}
