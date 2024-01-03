import ResetPasswordForm from '../components/ResetPasswordForm';

export default function page({
  params: { email },
}: {
  params: { email: string };
}) {
  return (
    <div className='px-5 md:px-10 flex flex-col justify-center min-h-[50vh]'>
      <h2 className='capitalize text-white text-xl'>password reset</h2>
      <ResetPasswordForm email={email} />
    </div>
  );
}
