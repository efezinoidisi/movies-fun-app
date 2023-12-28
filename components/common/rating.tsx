import Icons from '@/lib/icons';
import React from 'react';

export default function Rating({ rating }: { rating: number }) {
  const average = rating.toFixed(1);
  return (
    <span className='flex items-center'>
      <Icons.star className={'text-yellow-500'} />
      <span className='text-xs'>{average}</span>
    </span>
  );
}
