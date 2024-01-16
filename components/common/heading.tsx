export default function Heading({ text }: { text: string }) {
  return (
    <h2 className='capitalize font-bold text-white text-2xl md:text-3xl lg:text-4xl mb-4 text-center md:text-start'>
      {text}
    </h2>
  );
}
