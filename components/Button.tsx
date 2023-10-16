type ButtonProps = {
  children: React.ReactNode;
  type?: 'reset' | 'submit' | 'button';
  onClick?: () => void;
  className: string;
};

export default function Button(props: ButtonProps) {
  const { children, type = 'button', ...otherProps } = props;

  return (
    <button type={type} {...otherProps}>
      {children}
    </button>
  );
}
