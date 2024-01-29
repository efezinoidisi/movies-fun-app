import './globals.css';
import type { Metadata } from 'next';
import { ibmMono } from './fonts';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import NavHeader from '@/components/navigation/NavHeader';
import BackToTop from '@/components/Buttons/back-to-top';
import Sidebar from '@/components/navigation/sidebar';
import { Suspense } from 'react';
import Fallback from '@/components/loaders/fallback';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    template: 'moviesFun | %s',
    default: 'moviesFun',
  },
  description:
    'discover interesting movies,people and tv series of different genres. ',
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
          <main className='md:grid md:grid-cols-12'>
            <Sidebar />
            <section className='md:col-span-10 overflow-x-clip relative'>
              <Suspense
                fallback={
                  <Fallback extraStyles='absolute top-9 left-1/2 -translate-x-1/2 transform' />
                }
              >
                <NavHeader />
              </Suspense>

              {children}
            </section>
          </main>
          <BackToTop />
          <Analytics />
          {modals}
        </Providers>
      </body>
    </html>
  );
}
