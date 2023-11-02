import ResetPasswordForm from '../components/ResetPasswordForm';

export default function page({
  params: { email },
}: {
  params: { email: string };
}) {
  return (
    <div>
      <h2>password reset</h2>
      <ResetPasswordForm email={email} />
    </div>
  );
}
