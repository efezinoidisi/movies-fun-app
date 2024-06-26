import Icons from "@/lib/icons";
import Link from "next/link";

export default function WatchTrailerButton({ path = "" }: { path?: string }) {
  return (
    <Link
      href={`${path}`}
      className="bg-purple-700 py-2 md:py-3 text-sm md:px-4 capitalize px-2  rounded-lg text-white flex gap-2 items-center h-12 min-w-max hover:bg-black/80 hover:border hover:border-purple-500/80 transition-colors duration-200 ease-linear w-full"
    >
      <Icons.play className="text-3xl" />
      watch trailer
    </Link>
  );
}
