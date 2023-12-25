import { merge } from '@/utils/merge';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
  const { children, className, ...otherProps } = props;

  return (
    <button className={merge('outline-none', className)} {...otherProps}>
      {children}
    </button>
  );
}
