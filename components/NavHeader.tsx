import Link from 'next/link';
import NavBar from './NavBar';
import search from '@/assets/Search.svg';
import Image from 'next/image';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Logout from './Buttons/logout';

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
      <div className='hidden md:flex w-fit'>
        <NavBar />
      </div>
      <div className='flex justify-between items-center gap-3'>
        <Link href={'/search'} className=''>
          <Image src={search} alt='' width={20} height={20} />
        </Link>
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
