import Footer from '@/components/Footer';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      {children}
      <Footer />
    </div>
  );
}
