import { Suspense } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import Fallback from '@/components/loaders/fallback';

export default function page({
  params: { email },
}: {
  params: { email: string };
}) {
  return (
    <div className='px-5 md:px-10 flex flex-col justify-center min-h-[50vh]'>
      <h2 className='capitalize text-white text-xl'>password reset</h2>
      <Suspense fallback={<Fallback />}>
        <ResetPasswordForm email={email} />
      </Suspense>{' '}
    </div>
  );
}
