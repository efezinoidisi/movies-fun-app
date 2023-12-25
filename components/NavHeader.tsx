import Link from 'next/link';
import NavBar from './NavBar';
import search from '@/assets/Search.svg';
import Image from 'next/image';
import authOptions from 'config/authOptions';
import { getServerSession } from 'next-auth';
import Logout from './Buttons/logout';
import { NavSearchInput } from './Search';

type Props = {
  styles?: string;
};

export default async function NavHeader(props: Props) {
  const { styles } = props;
  const session = await getServerSession(authOptions);

  const isLoggedIn = session !== null;
  return (
    <header
      className={`flex justify-between items-center absolute w-full top-9 font-bold px-5 md:px-20 z-50 text-white ${styles} capitalize`}
    >
      <Link href={'/'}>
        {' '}
        <h1 className=''>zmovies</h1>
      </Link>
      <div className='hidden lg:flex w-fit'>
        <NavBar />
      </div>
      <div className='flex justify-between items-center gap-3'>
        <NavSearchInput />
        {isLoggedIn ? (
          <Logout />
        ) : (
          <>
            <Link href={'/signup'}>signup</Link>
            <Link href={'/login'}>login</Link>
          </>
        )}
      </div>
    </header>
  );
}
