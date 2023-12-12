'use client';
import { useInView } from 'react-intersection-observer';

type Props = {
  fetchData: () => void;
  page: number;
};

export default function InfiniteScrolling(props: Props) {
  const { page = 1, fetchData } = props;
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  return (
    <div>
      <h2>infinite scroll</h2>
    </div>
  );
}
