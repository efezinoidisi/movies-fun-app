'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputWrap from '@/components/form/InputWrap';
import Button from '@/components/Button';
import { useSearchParams } from 'next/navigation';

const schema = yup
  .object({
    password: yup
      .string()
      .required('password is required')
      .min(7, 'password must be at least 7 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'passwords do not match'),
  })
  .required();

export default function ResetPasswordForm({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      email,
      token,
      password: data.password,
    };
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      console.log(body);
      if (res.ok) {
        toast.success(body.message);
      } else {
        toast.error(body.message, { duration: 5000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        position: 'top-left',
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <InputWrap
        id='password'
        label='password'
        placeholder='password'
        error={errors?.password?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit placeholder-shown:border-0 placeholder-shown:border-b border  text-black placeholder-transparent border-gray`}
          {...register('password')}
          type={'password'}
          id={'password'}
          placeholder={'password'}
          aria-invalid={errors?.password ? true : false}
        />
      </InputWrap>
      <InputWrap
        id='confirmPassword'
        label='confirm password'
        error={errors?.confirmPassword?.message}
      >
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b  text-black placeholder-transparent border-gray`}
          {...register('confirmPassword')}
          type={'password'}
          id={'confirmPassword'}
          placeholder={'retype password'}
          aria-invalid={errors?.confirmPassword ? true : false}
        />
      </InputWrap>
      <Button
        type='submit'
        className='self-center bg-accent capitalize text-white rounded-lg p-2 hover:bg-white hover:text-black'
      >
        reset
      </Button>
    </form>
  );
}
