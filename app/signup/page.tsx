import SignUpForm from './components/SignUpForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <>
      <SignUpForm />
    </>
  );
}
