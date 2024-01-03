'use client';
import { signOut } from 'next-auth/react';
import Button from '../Button';

export default function Logout() {
  const handleLogout = () => {
    signOut({ redirect: false });
  };
  return (
    <Button
      className='border rounded-2xl capitalize px-3 py-1 hover:bg-black transition-colors ease-in-out duration-300 border-accent text-accent text-sm md:text-base bg-white/80'
      onClick={handleLogout}
    >
      logout
    </Button>
  );
}
