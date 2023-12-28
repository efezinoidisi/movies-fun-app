'use client';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import Button from './Button';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import { handleSearchSubmit } from '@/utils/actions';

export default function Search() {
  const searchParams = useSearchParams();

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

  return (
    <input
      type='search'
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder='search movie,tv or person'
      className='text-black px-5 py-2 rounded-lg mx-7 md:mx-14 lg:mx-32 outline-none focus:border-blue-500/50 focus:border'
    />
  );
}

export function NavSearchInput() {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const submitSearch = () => {
    handleSearchSubmit(inputRef.current?.value || '');
    toggleSearch();
  };

  return (
    <div className={'w-full flex gap-1 relative'}>
      {showSearch && (
        <form action={submitSearch} className='w-full relative  py-2'>
          <input
            autoFocus
            ref={inputRef}
            type='search'
            className='pl-2 md:pl-5 py-1 outline-none pr-10 w-full rounded-lg text-black focus:border focus:border-main/40'
            placeholder='search movie,tv or person'
          />
          <Button
            type='submit'
            className='absolute top-1/2 -translate-y-1/2 right-1 border p-1 rounded-lg border-accent/50'
          >
            <Icons.search className=' text-black text-xl' />
          </Button>
        </form>
      )}
      <Button
        className={`w-fit group ${
          showSearch ? 'absolute -right-3 -top-2' : ''
        } hover:opacity-60`}
        onClick={toggleSearch}
        aria-label={showSearch ? 'close search' : 'open search'}
      >
        {showSearch ? (
          <Icons.close className={`text-xl text-red-400 `} />
        ) : (
          <Icons.search className={'text-xl'} />
        )}
      </Button>
    </div>
  );
}
