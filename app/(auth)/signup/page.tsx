import SignUpForm from './components/SignUpForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';
import Link from 'next/link';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 flex flex-col items-center  py-5 px-5 md:pt-20'>
      <h2 className='capitalize'>registration form</h2>
      <SignUpForm />
      <div className='mt-7 text-xs'>
        <p>
          already have an account? <Link href={'/login'}>login</Link>
        </p>
      </div>
    </main>
  );
}
