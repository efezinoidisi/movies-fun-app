import Login from './components/Login';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <div>
      <h2>Login</h2>
      <Login />
      <p>
        don&#39;t have an account? <Link href={'/signup'}>register</Link>
      </p>
    </div>
  );
}
