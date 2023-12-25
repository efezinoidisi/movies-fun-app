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
      className='text-black'
    />
  );
}

export function NavSearchInput() {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div
      className={merge(
        'w-full flex gap-2 md:relative md:top-0',
        showSearch && 'fixed top-20 left-0 '
      )}
    >
      {showSearch && (
        <form
          action={() => handleSearchSubmit(inputRef.current?.value || '')}
          className='w-full relative'
        >
          <input
            autoFocus
            ref={inputRef}
            type='search'
            className='text-black pl-5 py-3 outline-none pr-10 w-full'
          />
          <Button
            type='submit'
            className='absolute top-1/2 -translate-y-1/2 right-1 border p-2 rounded-lg border-red-900'
          >
            <Icons.search className=' text-black text-xl' />
          </Button>
        </form>
      )}
      <Button
        className='w-fit'
        onClick={() => {
          setShowSearch((prev) => !prev);
        }}
      >
        {showSearch ? <Icons.close /> : <Icons.search className={''} />}
      </Button>
    </div>
  );
}
