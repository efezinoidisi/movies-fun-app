import { IMG_URL } from "@/constants/data";
import { merge } from "@/utils/merge";
import Link from "next/link";

type Props = {
  id: number;
  picture: string;
  name: string;
  character?: string;
  styles?: string;
};
export default function Person({
  picture,
  name,
  id,
  character,
  styles = "",
}: Props) {
  const image = picture ? `${IMG_URL}${picture}` : "/unknown.webp";
  return (
    <Link
      href={`/people/${id}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
      prefetch={false}
      className={merge(
        "hero relative justify-end flex flex-col min-h-72 rounded-lg  overflow-hidden w-full mr-10 border border-accent/50 group hover:scale-y-105",
        styles
      )}
    >
      <div className="bg-black/60 w-full px-5 py-4">
        <h4 className="text-center truncate group-hover:text-accent text-white font-bold transition-colors duration-500 ease-linear capitalize tracking-wide group-hover:overflow-visible group-hover:text-wrap">
          {name}
        </h4>
        {character && (
          <p className="text-sm text-center text-white/80 max-h-[50%]">
            {character}
          </p>
        )}
      </div>
    </Link>
  );
}
