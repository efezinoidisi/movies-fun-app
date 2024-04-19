import tmdb from "@/assets/imbd-logo.svg";
import Icons from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=" pt-10 pb-24 md:py-10 border-t border-gray-700 px-5 flex flex-col gap-5">
      <div className="flex justify-between items-center w-full md:w-3/4 md:mx-auto">
        <h5 className="font-bold text-md md:text-lg">
          movies
          <span className="uppercase bg-clip-text text-transparent bg-gradient-to-bl from-accent to-white">
            fun
          </span>
        </h5>

        <Link
          href={"https://github.com/efezinoidisi/movies-fun-app"}
          target="_blank"
          aria-label="github"
          className="transition-all hover:scale-110 duration-300"
        >
          <Icons.github size={25} />
        </Link>
      </div>
      <div className="flex items-center gap-2 md:w-3/4 mx-auto">
        <Image
          src={tmdb}
          alt="the movie  db logo"
          width={70}
          height={70}
          className="w-10"
        />
        <p className="text-xs">
          This project uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <p className="text-sm text-center">
        made with ❤ by{" "}
        <Link
          href={"https://efezino-portfolio.netlify.app"}
          target="_blank"
          className="underline hover:text-blue-600 transition-colors duration-300 ease-linear"
        >
          Efezino
        </Link>
        . &copy; {currentYear} All rights reserved
      </p>
    </footer>
  );
}
