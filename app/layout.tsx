import './globals.css';
import type { Metadata } from 'next';
import { ibmMono } from './fonts';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import NavHeader from '@/components/NavHeader';
import BackToTop from '@/components/Buttons/back-to-top';
import Sidebar from '@/components/navigation/sidebar';

export const metadata: Metadata = {
  title: 'Zmovies',
  description: 'Find interesting movies or shows you like',
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
          <NavHeader />
          <main className='md:grid md:grid-cols-12'>
            <Sidebar />
            <section className='md:col-span-11'>{children}</section>
          </main>
          <BackToTop />
          {modals}
        </Providers>
      </body>
    </html>
  );
}
