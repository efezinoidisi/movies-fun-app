'use client';
import { signOut } from 'next-auth/react';
import Button from '../Button';

export default function Logout() {
  const handleLogout = () => {
    signOut();
  };
  return (
    <Button className='' onClick={handleLogout}>
      logout
    </Button>
  );
}
