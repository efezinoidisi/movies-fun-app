'use client';
import useForm from 'hooks/useForm';
import * as yup from 'yup';
import InputWrap from '../form/InputWrap';
import Button from '../Button';
import { debounce } from 'lodash';
import Input from '../form/Input';
import toast from 'react-hot-toast';

const debouncedValidation = debounce(async (value: string) => {
  const controller = new AbortController();
  const res = await fetch('api/auth/userExists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: value }),
  });
  const { user } = await res.json();

  if (user) {
    return false;
  }
  return true;
}, 5000);

const schema = yup
  .object({
    email: yup
      .string()
      .email('provide valid email')
      .required('email is required')
      .test(
        'checkDuplicateEmail',
        'user with email exists',
        async (value, obj) => {
          if (!value || obj.originalValue === value) return true;
          const res = await debouncedValidation(value as string);
          return res as boolean;
        }
      ),
    username: yup
      .string()
      .min(3, 'username must be at least three characters')
      .required('username is required'),
  })
  .required();

export default function EditUserForm({
  email,
  username,
  id,
  toggleEdit,
}: {
  email: string;
  username: string;
  id: string;
  toggleEdit: () => void;
}) {
  const defaultValues = {
    email,
    username,
  };
  const {
    reset,
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm(schema, defaultValues);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('profile updated!');
      } else {
        toast.error('profile update failed!');
      }
    } catch (error) {
      toast.error('an error occurred! please try again');
      reset();
    }
  });

  return (
    <form
      className={`flex flex-col items-center gap-3 px-5 pt-7 py-3 justify-center ${
        isSubmitting ? 'opacity-70' : ''
      }`}
      onSubmit={onSubmit}
    >
      <Input
        label='email'
        placeholder='email'
        controlname='email'
        error={errors?.email?.message}
        register={register}
      />
      <Input
        label='username'
        placeholder='username'
        controlname='username'
        error={errors?.username?.message}
        register={register}
      />
      <div className='flex gap-2'>
        <Button
          type='button'
          className='bg-red-500/80 w-20 py-2 capitalize rounded-xl text-black'
          onClick={toggleEdit}
        >
          cancel
        </Button>
        <Button
          type='submit'
          className='bg-accent py-2 capitalize rounded-xl w-20 text-white'
        >
          save
        </Button>
      </div>
    </form>
  );
}
