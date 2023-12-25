export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='fixed inset-0 h-auto w-full bg-black z-20 bg-opacity-50' />
      {children}
    </div>
  );
}
