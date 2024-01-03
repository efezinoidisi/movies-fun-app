import './globals.css';
import type { Metadata } from 'next';
import { ibmMono } from './fonts';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import NavHeader from '@/components/navigation/NavHeader';
import BackToTop from '@/components/Buttons/back-to-top';
import Sidebar from '@/components/navigation/sidebar';
import { Suspense } from 'react';
import Ellipsis from '@/components/loaders/ellipsis';

export const metadata: Metadata = {
  title: {
    template: 'moviesFun | %s',
    default: 'moviesFun',
  },
  description:
    'discover interesting movies,people and shows of different kinds',
};

export default function RootLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${ibmMono.variable} bg-background text-text font-ibm-mono`}
      >
        <Providers>
          <Toaster />
          <Suspense fallback={<Ellipsis />}>
            <NavHeader />
          </Suspense>
          <main className='md:grid md:grid-cols-12'>
            <Sidebar />
            <section className='md:col-span-11 overflow-x-clip'>
              {children}
            </section>
          </main>
          <BackToTop />
          {modals}
        </Providers>
      </body>
    </html>
  );
}
