import Link from 'next/link';
import NavBar from './NavBar';
import search from '@/assets/Search.svg';
import Image from 'next/image';

type Props = {
  styles?: string;
};

export default function NavHeader(props: Props) {
  const { styles } = props;
  return (
    <header className={`flex justify-between items-center ${styles}`}>
      <Link href={'/'}>
        {' '}
        <h1>zeemovies</h1>
      </Link>
      <div className='hidden md:flex w-fit'>
        <NavBar />
      </div>
      <div className='flex justify-between items-center gap-3'>
        <Link href={'/search'} className=''>
          <Image src={search} alt='' width={20} height={20} />
        </Link>
        <Link href={'/signup'}>signup</Link>
        <Link href={'/login'}>login</Link>
      </div>
    </header>
  );
}
