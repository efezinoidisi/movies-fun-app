import ModalOverlay from '@/components/modal/modal-overlay';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ModalOverlay />
      {children}
    </div>
  );
}
