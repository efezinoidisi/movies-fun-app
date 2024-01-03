import ResetPasswordForm from '../components/ResetPasswordForm';

export default function page({
  params: { email },
}: {
  params: { email: string };
}) {
  return (
    <div className='px-5 md:px-10'>
      <h2>password reset</h2>
      <ResetPasswordForm email={email} />
    </div>
  );
}
