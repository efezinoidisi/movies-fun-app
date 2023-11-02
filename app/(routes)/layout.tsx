import NavHeader from '@/components/NavHeader';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavHeader styles='py-7 bg-background text-text bg-inner shadow-outer z-30 px-5 fixed top-0 w-full' />
      {children}
    </>
  );
}
