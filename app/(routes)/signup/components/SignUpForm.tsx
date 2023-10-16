'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    email: yup
      .string()
      .email('provide valid email')
      .required('email is required'),
    password: yup
      .string()
      .min(7, 'password must be at least 6 characters')
      .required(),
    username: yup
      .string()
      .min(3, 'username must be at least three characters')
      .required('username is required'),
  })
  .required();

export default function SignUpForm() {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const handleSignUp = async (data: SignUpForm) => {
    if (error) setError('');

    try {
      const checkIfUserExists = await fetch('api/auth/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const { user } = await checkIfUserExists.json();

      if (user) {
        setError('User already exists with provided email');
        return;
      }

      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const body = await res.json();
        reset();
        router.push('/login');
      } else {
        setError('An error occurred');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className='flex flex-col items-center gap-5 justify-center py-32'
      >
        {error && (
          <div className='text-red-500 bg-red-100 rounded-md p-2'>
            <p>{error}</p>
          </div>
        )}
        <input
          type='text'
          {...register('username')}
          id='username'
          className='border border-gray-400 p-2 text-black rounded-xl outline-none'
          placeholder='username'
        />

        {errors.username && <p>{errors.username.message}</p>}
        <input
          type='email'
          {...register('email')}
          id='email'
          className='border border-gray-400 p-2 text-black rounded-xl outline-none'
          placeholder='email'
        />

        {errors.email && <p>{errors.email.message}</p>}
        <input
          type='password'
          {...register('password')}
          id='password'
          className='border border-gray-400 p-2 text-black rounded-xl outline-none'
          placeholder='password'
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button
          type='submit'
          className='bg-teal-400 rounded-lg mt-3 px-6 py-2 text-black'
        >
          register
        </button>
      </form>
      <p>
        already have an account <Link href={'/login'}>login</Link>
      </p>
    </div>
  );
}
