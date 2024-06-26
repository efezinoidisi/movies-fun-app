"use client";

import Icons from "@/lib/icons";
import Link from "next/link";

export default function NavHeader() {
  return (
    <header
      className={`flex justify-between items-center absolute top-9 font-bold  z-50 text-white text-opacity-90 capitalize  left-1/2 -translate-x-1/2 w-full bg-inherit px-5 md:px-10 lg:px-16`}
    >
      {" "}
      <h1 className="font-bold text-2xl md:text-3xl  from-accent via-text to-primary bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] bg-clip-text text-transparent">
        <Link href={"/"}>moviesFUN</Link>
      </h1>
      <div className="flex justify-between items-center gap-3 md:gap-10">
        <Link
          href={"/favourites"}
          className="hover:text-accent transition-colors duration-300 ease-linear hover:scale-110"
        >
          <Icons.heart size={25} />
          <span className="sr-only">favourites</span>
        </Link>

        <Link
          href={"/watchlist"}
          className="hover:text-accent transition-colors duration-300 ease-linear hover:scale-110"
        >
          <Icons.watchlist size={25} />
          <span className="sr-only">watchlist</span>
        </Link>
      </div>
    </header>
  );
}
