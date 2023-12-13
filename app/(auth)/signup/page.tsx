import SignUpForm from './components/SignUpForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';
import Link from 'next/link';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='bg-inner shadow-outer rounded-2xl flex flex-col items-center w-11/12 md:w-1/2  mx-auto py-5 md:mt-5 '>
      <SignUpForm />
      <div className='mt-7 text-xs'>
        <p>
          already have an account? <Link href={'/login'}>login</Link>
        </p>
      </div>
    </main>
  );
}
