'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('provide valid email')
      .required('email is required'),
    password: yup
      .string()
      .min(7, 'password must be at least 7 characters')
      .required(),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const handleLogin = async (data: LoginForm) => {
    if (error) setError('');
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError('invalid credentials!');
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className='flex flex-col items-center gap-5 justify-center py-32'
    >
      {error && (
        <div className='text-red-500 bg-red-100 rounded-md p-2'>
          <p>{error}</p>
        </div>
      )}
      <input
        type='email'
        {...register('email')}
        id='email'
        className='border border-gray-400 p-2 text-black rounded-xl outline-none'
        placeholder='email'
      />
      <input
        type='password'
        {...register('password')}
        id='password'
        className='border border-gray-400 p-2 text-black rounded-xl placeholder:capitalize outline-none'
        placeholder='password'
      />
      <button
        type='submit'
        className='bg-teal-400 rounded-lg mt-3 px-6 py-2 text-black'
      >
        login
      </button>
    </form>
  );
}
