import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
  const { children, ...otherProps } = props;

  return <button {...otherProps}>{children}</button>;
}
