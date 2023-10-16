'use client';

import search from '@/assets/Search.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue, useEffect, useState } from 'react';
import Button from './Button';

export default function Search() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const page = searchParams.get('page') || '1';
  const [isSearch, setIsSearch] = useState(false);
  const active = searchParams.get('search') === 'true';

  const query = useDeferredValue(text);
  // useEffect(() => {
  //   if (query) {
  //     setText(query);
  //   }
  //   handleSearch();
  // }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`api/search?q=${query}&page=${page}`);
    const body = await res.json();
    console.log(body);
  };
  return (
    <div className='flex relative'>
      <Button className='' onClick={() => setIsSearch((prev) => !prev)}>
        <Image src={search} alt='' width={20} height={20} />
      </Button>
      {isSearch && (
        <form onSubmit={handleSearch} className='animate-search'>
          <input
            type='search'
            value={text}
            onChange={handleChange}
            className='text-black'
          />
          <button type='submit'>search</button>
        </form>
      )}
    </div>
  );
}
