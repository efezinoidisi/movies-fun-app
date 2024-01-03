import Ellipsis from '@/components/loaders/ellipsis';

export default function loading() {
  return (
    <div>
      <div className='py-12'></div>
      <Ellipsis />
    </div>
  );
}
