'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import InputWrap from '@/components/form/InputWrap';
import Ring from '@/components/loaders/ring';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import useCustomForm from 'hooks/useForm';

const schema = yup
  .object({
    email: yup
      .string()
      .email('provide valid email')
      .required('email is required'),
    password: yup
      .string()
      .min(7, 'password must be at least 7 characters')
      .required('please enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'passwords must match')
      .required('please retype password'),
    username: yup
      .string()
      .min(3, 'username must be at least three characters')
      .required('username is required'),
  })
  .required();

export default function SignUpForm() {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const defaultValues = {
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  };
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/';

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useCustomForm(schema, defaultValues);

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
        reset();
        router.push(`/login?from=${from}`);
      } else {
        setError('An error occurred');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className={merge(
        'flex flex-col items-center gap-1 justify-center ',
        isSubmitting && 'opacity-70'
      )}
    >
      {error ? (
        <div className='text-white bg-pink-400 rounded-md p-2 mt-3'>
          <p>{error}</p>
        </div>
      ) : null}
      <InputWrap
        id='username'
        label='username'
        placeholder='username'
        error={errors?.username?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b placeholder-transparent border-gray group-focus:shadow-zl`}
          {...register('username')}
          type={'text'}
          id={'username'}
          placeholder={'username'}
          aria-invalid={errors?.username ? true : false}
        />
      </InputWrap>
      <InputWrap
        id='email'
        label='email'
        placeholder='email'
        error={errors?.email?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b placeholder-transparent border-gray`}
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

      <InputWrap
        id='confirmPassword'
        label='comfirm password'
        placeholder='confirm password'
        error={errors?.confirmPassword?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b  text-black placeholder-transparent border-gray`}
          {...register('confirmPassword')}
          type={'password'}
          id={'confirmPassword'}
          placeholder={'confirm password'}
          aria-invalid={errors?.confirmPassword ? true : false}
        />
      </InputWrap>
      <Button
        type='submit'
        className='bg-accent rounded-lg mt-3 px-6 py-2 text-white capitalize flex items-center gap-2'
      >
        sign up
        {isSubmitting && (
          <Icons.loader className='w-5 h-5 animate-spin text-lg' />
        )}
      </Button>
    </form>
  );
}
