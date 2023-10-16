import NavHeader from '@/components/NavHeader';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavHeader styles='py-7  px-5 sticky top-0' />
      {children}
    </>
  );
}
