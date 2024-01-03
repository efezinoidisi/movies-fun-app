'use client';
import { signOut } from 'next-auth/react';
import Button from '../Button';

export default function Logout() {
  const handleLogout = () => {
    signOut({ redirect: false });
  };
  return (
    <Button
      className='border rounded-2xl capitalize px-3 py-1 hover:text-white transition-colors ease-in-out duration-300 hover:border-main/80 border-accent text-accent'
      onClick={handleLogout}
    >
      logout
    </Button>
  );
}
