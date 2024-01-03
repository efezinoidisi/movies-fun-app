import Login from './components/Login';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';
import { Suspense } from 'react';
import Loader from '@/components/loaders/loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'moviesFun - Login',
  description: 'Find interesting movies or shows you like',
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/profile');
  return (
    <main className='w-full pt-5 md:pt-32 px-10 lg:px-20'>
      <h2 className='capitalize py-2 font-bold text-center text-white'>
        welcome back
      </h2>
      <p className='text-xs min-w-max text-right'>
        Don&#39;t have an account?{' '}
        <Link href={'/signup'} className='text-blue-500 underline'>
          sign up for free
        </Link>
      </p>
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </main>
  );
}
