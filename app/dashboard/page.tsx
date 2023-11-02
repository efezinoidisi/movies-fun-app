'use client';
import { signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import NavHeader from '@/components/NavHeader';

export default function Page() {
  // const session = await getServerSession(authOptions);
  // console.log(session);

  // await getWatchlist();
  const { data } = useSession();
  console.log('session', data);
  const handleLogout = () => {
    signOut();
  };
  return (
    <main className='py-10 px-5 md:px-10'>
      <NavHeader />
      <button onClick={handleLogout}>signout</button>
    </main>
  );
}

const getWatchlist = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/watchlist`);
    const body = await res.json();
    console.log(body);
  } catch (error) {
    console.log(error);
  }
};
