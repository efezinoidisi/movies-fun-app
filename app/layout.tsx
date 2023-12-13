import './globals.css';
import type { Metadata } from 'next';
import { ibmMono } from './fonts';
import Providers from './providers';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import NavHeader from '@/components/NavHeader';

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
          {children}
          <Footer />
          {modals}
        </Providers>
      </body>
    </html>
  );
}
