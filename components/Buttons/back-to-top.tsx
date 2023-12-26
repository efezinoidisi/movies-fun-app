'use client';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Icons from '@/lib/icons';

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton ? (
        <Button className='fixed bottom-10 right-10' onClick={scrollToTop}>
          <Icons.doubleDownArrow className='text-4xl  rotate-180 text-accent' />
          top
        </Button>
      ) : null}
    </>
  );
}
