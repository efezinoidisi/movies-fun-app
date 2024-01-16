type SubHeadingprops = {
  text: string;
};

export default function SubHeading({ text }: SubHeadingprops) {
  return (
    <h3 className='text-white text-xl font-semibold capitalize mb-4 flex items-center md:text-2xl lg:text-3xl'>
      <span className='pr-2 min-w-max'>{text}</span>
      <span className='bg-accent/40 w-full h-[0.1rem]'></span>
    </h3>
  );
}
