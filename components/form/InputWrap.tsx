type InputProps = {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
  placeholder?: string;
};

export default function InputWrap(props: InputProps) {
  const { label, id, error, placeholder, children } = props;
  return (
    <div className='relative py-4 w-full'>
      <div className='flex shadow-al p-4 pl-5 rounded-xl gap-2 items-center bg-body'>
        <label htmlFor={id} className={`capitalize min-w-fit`}>
          {label}
        </label>
        {children}
      </div>

      {error && (
        <p role='alert' className='text-red-500 text-xs pt-1'>
          {error}
        </p>
      )}
    </div>
  );
}
