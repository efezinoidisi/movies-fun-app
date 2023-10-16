'use client';

import { NAVIGATION } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const path = usePathname();

  const navigationLinks = NAVIGATION.map(({ id, href, name }) => {
    const isActive = path === href;

    return (
      <Link href={href} key={id} className={`${isActive ? '' : ''}`}>
        {name}
      </Link>
    );
  });

  return <nav className='flex-between-center gap-3'>{navigationLinks}</nav>;
}
