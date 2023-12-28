'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputWrap from '@/components/form/InputWrap';
import Button from '@/components/Button';

type LoginForm = {
  email: string;
  password?: string;
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
        router.replace('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className='flex flex-col items-center justify-center '
    >
      <InputWrap
        id='email'
        label='email'
        placeholder='email'
        error={errors?.email?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b  text-white placeholder-transparent border-gray`}
          {...register('email')}
          type={'email'}
          id={'email'}
          placeholder={'email'}
          aria-invalid={errors?.email ? true : false}
        />
      </InputWrap>

      <InputWrap
        id='password'
        label='password'
        placeholder='password'
        error={errors?.password?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b  text-black placeholder-transparent border-gray`}
          {...register('password')}
          type={'password'}
          id={'password'}
          placeholder={'password'}
          aria-invalid={errors?.password ? true : false}
        />
      </InputWrap>
      <Link
        href={'forgot-password'}
        className='text-right block underline ml-auto text-xs'
      >
        forgot your password?
      </Link>
      <Button
        type='submit'
        className='bg-accent rounded-2xl mt-3 px-6 py-2 text-white filter'
      >
        login
      </Button>
    </form>
  );
}
