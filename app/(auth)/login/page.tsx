import Login from './components/Login';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='w-full pt-5 md:pt-32 px-10 lg:px-20'>
      <h2 className='capitalize py-2 font-bold text-center'>welcome back</h2>
      <Login />
    </main>
  );
}
