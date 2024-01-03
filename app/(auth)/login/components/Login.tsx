'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import InputWrap from '@/components/form/InputWrap';
import Button from '@/components/Button';
import Icons from '@/lib/icons';
import useCustomForm from 'hooks/useForm';
import toast from 'react-hot-toast';

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
  const defaultValues = {
    email: '',
    password: '',
  };

  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/';

  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useCustomForm(schema, defaultValues);

  const router = useRouter();
  const [error, setError] = useState('');
  const handleLogin = async (data: LoginForm) => {
    console.log('submitting');

    if (error) setError('');
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError('invalid credentials!');
      } else {
        router.replace(from);
      }
    } catch (error) {
      toast.error('An error occurred signing in!');
    }
  };

  const handleTestUserLogin = async () => {
    const loginPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWD as string;
    setValue('email', 'user@example.com');
    setValue('password', loginPassword);

    const isValid = await trigger();
    if (isValid) {
      handleSubmit(handleLogin)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={`flex flex-col items-center justify-center ${
        isSubmitting ? 'opacity-70' : ''
      }`}
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
      <div className='flex items-center gap-3'>
        <Button
          type='submit'
          className='bg-accent rounded-lg mt-3 px-6 py-2 text-white capitalize flex items-center gap-2'
        >
          login
          {isSubmitting && (
            <Icons.loader className='w-5 h-5 animate-spin text-lg' />
          )}
        </Button>
        <Button
          type='button'
          className='bg-black border border-pink-500  rounded-lg mt-3 px-6 py-2 capitalize flex items-center gap-2'
          onClick={handleTestUserLogin}
        >
          test user login
        </Button>
      </div>
    </form>
  );
}
