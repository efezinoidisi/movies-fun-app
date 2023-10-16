import ModalWrapper from './ModalWrapper';
export default function VideoModal({
  closeModal,
  videoKey = '',
}: {
  closeModal: () => void;
  videoKey: string;
}) {
  return (
    <ModalWrapper closeModal={closeModal}>
      {videoKey ? (
        <iframe
          height={500}
          src={`https://www.youtube.com/embed/${videoKey}?&autoplay=1`}
          title='YouTube video player'
          allowFullScreen
          className='w-full'
        ></iframe>
      ) : (
        <p>loading</p>
      )}
    </ModalWrapper>
  );
}
