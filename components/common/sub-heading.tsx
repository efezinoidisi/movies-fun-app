type SubHeadingprops = {
  text: string;
};

export default function SubHeading({ text }: SubHeadingprops) {
  return (
    <h3 className="text-white text-xl font-semibold capitalize mb-4 md:text-2xl lg:text-3xl bg-[#d3ae85] py-5 text-center">
      {text}
    </h3>
  );
}
