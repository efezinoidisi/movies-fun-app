import Login from './components/Login';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='bg-inner shadow-outer rounded-2xl px-2 flex flex-col items-center w-full md:w-1/2  md:mx-auto py-5 mt-5'>
      <h2 className='capitalize py-2 font-bold'>welcome back</h2>
      <Login />
      <div className='flex flex-col mt-4 text-xs gap-1 md:flex-row md:justify-between md:gap-6'>
        <p>
          New here? <Link href={'/signup'}>create account</Link>
        </p>
        <Link href={'forgot-password'}>forgot your password</Link>
      </div>
    </main>
  );
}
