import Fallback from '@/components/loaders/fallback';

export default function loading() {
  return (
    <div>
      <div className='py-12'></div>
      <Fallback />
    </div>
  );
}
