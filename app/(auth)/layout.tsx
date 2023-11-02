import NavHeader from '@/components/NavHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-background'>
      <NavHeader styles='py-7 bg-background z-30 px-5 sticky top-0 w-full' />
      {children}
    </div>
  );
}
