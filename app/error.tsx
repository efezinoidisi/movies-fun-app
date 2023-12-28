'use client';
import ErrorComp from '@/components/error/error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComp message={error.message} />;
}
