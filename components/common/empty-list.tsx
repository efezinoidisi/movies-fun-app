import Image from "next/image";

const Empty = ({ title }: { title: string }) => {
  return (
    <div className="relative sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col justify-center items-center gap-5">
      <div className="relative">
        <Image
          src={"/Popcorns-bro.svg"}
          alt=""
          width={500}
          height={500}
          unoptimized
        />
        <p className="absolute text-[0.6rem] bottom-0 right-2">
          <a href="https://storyset.com/food" className="hover:underline">
            Food illustrations by Storyset
          </a>
        </p>
      </div>
      <h4 className="text-2xl md:text-4xl">{title}</h4>
    </div>
  );
};

export default Empty;
