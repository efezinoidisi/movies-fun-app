'use client';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data } = useSession();
  console.log(data);
  const handleLogout = () => {
    signOut();
  };
  return (
    <div className='py-10'>
      <h2>dashboard</h2>
      {data?.user?.email}
      {data?.user?.name}
      <button className='' onClick={handleLogout}>
        {' '}
        logout
      </button>
    </div>
  );
}
