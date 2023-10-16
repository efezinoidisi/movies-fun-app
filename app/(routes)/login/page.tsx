import Login from './components/Login';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <main className='bg-black text-white flex flex-col items-center py-5 gap-5'>
      <h2 className=''>Login to your account</h2>

      <div className='bg-white bg-opacity-10 w-9/12 py-10 rounded-lg'>
        <Login />
        <p>
          don&#39;t have an account? <Link href={'/signup'}>register</Link>
        </p>
      </div>
    </main>
  );
}
