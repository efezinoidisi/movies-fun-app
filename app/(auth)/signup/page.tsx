import SignUpForm from './components/SignUpForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';
import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Fallback from '@/components/loaders/fallback';

export const metadata: Metadata = {
  title: ' - signup',
  description: 'Find interesting movies or shows you like',
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='flex flex-col items-center  py-5 px-5 md:pt-20'>
      <h2 className='capitalize'>registration form</h2>
      <Suspense fallback={<Fallback />}>
        <SignUpForm />
      </Suspense>
      <div className='mt-7 text-sm'>
        <p>
          already have an account?{' '}
          <Link href={'/login'} className='underline capitalize text-accent'>
            login
          </Link>
        </p>
      </div>
    </main>
  );
}
