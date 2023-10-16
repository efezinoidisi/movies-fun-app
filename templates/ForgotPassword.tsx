import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Heading } from '@react-email/heading';
import { Text } from '@react-email/text';
import { Hr } from '@react-email/hr';

export default function ForgotPasswordEmail({
  params: { name, url },
}: {
  params: {
    name: string;
    url: string;
  };
}) {
  return (
    <Html>
      <Heading as='h2'>Hello {name}</Heading>
      <Text>
        We received the reset password from you. If it&#39;s not you please
        ignore this message.
      </Text>
      <Button
        pX={20}
        pY={20}
        href={url}
        style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
      >
        Click to continue with reset
      </Button>

      <Hr />

      <Heading as='h4'>Warm Regards</Heading>
      <Text>ZeeMovies</Text>
    </Html>
  );
}
