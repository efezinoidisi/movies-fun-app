import { merge } from '@/utils/merge';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    register: UseFormRegister<T>;
    controlname: Path<T>;
    containerStyles?: string;
  };

export default function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    label,
    id,
    error = '',
    name,
    register,
    controlname,
    containerStyles,
    ...others
  } = props;

  return (
    <div className={merge('w-full mb-2', containerStyles)}>
      <label htmlFor={id} className='relative w-full block'>
        <input
          className={`w-full block h-full
           focus:outline-none peer bg-inherit border border-text/50  text-white placeholder-transparent border-gray py-4 px-2 shadow-al rounded-xl focus-within:border-accent`}
          {...others}
          {...register(controlname)}
          aria-invalid={error ? true : false}
        />
        <span
          className={`capitalize absolute transition-all peer-placeholder-shown:top-3 peer-placeholder-shown: left-3 peer-focus:-top-3 transform duration-200 -top-3 peer-placeholder-shown:border-none border bg-background px-2 rounded-md peer-placeholder-shown:text-base ease-linear peer-placeholder-shown:text-text text-text text-sm border-dull`}
        >
          {label}
        </span>
      </label>

      {error && (
        <p role='alert' className='text-pink-500 text-sm pt-1'>
          {error}
        </p>
      )}
    </div>
  );
}
