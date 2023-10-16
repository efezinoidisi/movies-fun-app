'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputWrap from '@/components/form/InputWrap';
import Button from '@/components/Button';

const schema = yup
  .object({
    email: yup
      .string()
      .email('provide valid email')
      .required('email is required'),
  })
  .required();

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch('api/auth/forgot-password', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const body = await res.json();
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
    <form onSubmit={onSubmit}>
      <InputWrap label='email' id='email'>
        <input
          className={`w-full h-full
           focus:outline-none peer bg-inherit border-b  text-black placeholder-transparent border-gray`}
          {...register('email')}
          type={'email'}
          id={'email'}
          placeholder={''}
          aria-invalid={errors?.email ? true : false}
        />
      </InputWrap>

      <Button type='submit' className=''>
        submit
      </Button>
    </form>
  );
}
