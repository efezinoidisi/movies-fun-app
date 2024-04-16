"use client";

import Link from "next/link";

type Props = {
  styles?: string;
};

export default function NavHeader(props: Props) {
  const { styles } = props;

  return (
    <header
      className={`flex justify-between items-center absolute w-5/6 md:w-11/12 top-9 font-bold md:px-10 lg:px-10 z-50 text-white text-opacity-90 ${styles} capitalize  left-1/2 -translate-x-1/2`}
    >
      {" "}
      <h1 className="font-bold text-xl md:text-2xl">
        <Link href={"/"}>
          movies
          <span className="uppercase bg-clip-text text-transparent bg-gradient-to-bl from-accent to-white">
            fun
          </span>
        </Link>
      </h1>
      <div className="flex justify-between items-center gap-3">
        {/* <NavSearchInput /> */}
      </div>
    </header>
  );
}
