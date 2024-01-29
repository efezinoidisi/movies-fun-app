'use client';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconStyles =
  'group-hover:md:animate-bounce-once duration-500 transition-transform ease-linear md:hover:scale-105';

const sidebarItems: {
  title:
    | 'home'
    | 'movies'
    | 'series'
    | 'people'
    | 'search'
    | 'genres'
    | 'profile';
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: 'home',
    href: '/',
    icon: <Icons.home className={iconStyles} />,
  },
  {
    title: 'movies',
    href: '/movies',
    icon: <Icons.movie className={iconStyles} />,
  },
  {
    title: 'series',
    href: '/tv',
    icon: <Icons.tv className={iconStyles} />,
  },
  {
    title: 'people',
    href: '/people',
    icon: <Icons.people className={iconStyles} />,
  },
  {
    title: 'search',
    href: '/search',
    icon: <Icons.search className={iconStyles} />,
  },
  {
    title: 'genres',
    href: '/genres',
    icon: <Icons.genre className={iconStyles} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const content = sidebarItems.map(({ title, icon, href }) => {
    const active = href === pathname;

    return (
      <Link
        href={href}
        key={title}
        className={merge(
          'flex items-center text-3xl md:text-5xl lg:pr-5 md:pl-3 py-2 pl-2 pr-2 hover:bg-white/20 rounded-t-2xl md:rounded-tr-none md:rounded-s-2xl transition-colors ease-in-out duration-300 group md:pr-5',
          active ? 'bg-white/60 text-background ' : ''
        )}
        title={title}
      >
        {icon}
      </Link>
    );
  });
  return (
    <section className='fixed md:sticky bottom-0 w-full md:top-0 md:h-screen bg-body z-50 flex md:flex-col md:justify-start md:items-end md:py-20 pt-3 lg:gap-2 justify-between px-5 md:px-0 rounded-t-xl md:rounded-tl-none md:rounded-e-xl md:col-span-2'>
      {content}
    </section>
  );
}
