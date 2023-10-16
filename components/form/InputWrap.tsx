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
      {children}
      <label
        htmlFor={id}
        className={`capitalize absolute left-0 transition-all peer-placeholder-shown:top-2 peer-focus:-top-3.5  duration-300 text-base -top-3.5`}
      >
        {label}
      </label>
      {error && (
        <p role='alert' className='text-red-500 text-xs pt-1'>
          {error}
        </p>
      )}
    </div>
  );
}
