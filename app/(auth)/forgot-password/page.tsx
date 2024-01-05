import { Suspense } from 'react';
import ForgotPassword from './components/ForgotPasswordForm';
import Fallback from '@/components/loaders/fallback';

export default function page() {
  return (
    <div className='px-5 md:px-10 flex flex-col justify-center min-h-[50vh] '>
      <h2 className='capitalize text-white text-xl'>update password</h2>
      <Suspense fallback={<Fallback />}>
        <ForgotPassword />
      </Suspense>
    </div>
  );
}
