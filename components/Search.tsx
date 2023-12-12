'use client';
import { useDebouncedCallback } from 'use-debounce';
import search from '@/assets/Search.svg';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDeferredValue, useEffect, useState } from 'react';
import Button from './Button';

export default function Search() {
  const searchParams = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setText(event.target.value);
  // };

  return (
    <div className='flex relative'>
      <Button className='' onClick={() => setShowSearch((prev) => !prev)}>
        <Image src={search} alt='' width={20} height={20} />
      </Button>
      {showSearch && (
        <input
          type='search'
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className='text-black'
        />
      )}
    </div>
  );
}
