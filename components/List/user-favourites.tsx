"use client";

import Fallback from "@/components/loaders/fallback";
import { useFavouriteStore } from "@/providers/favourite-store-provider";
import { merge } from "@/utils/merge";
import Link from "next/link";
import { useEffect, useState } from "react";
import MediaItemCard from "../Cards/media-item";
import Empty from "../common/empty-list";

type UserFavouritesProps = {
  tab: "movie" | "tv";
};

export default function UserFavourites({ tab }: UserFavouritesProps) {
  const { movies, tv } = useFavouriteStore((state) => state);

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(false);
  }, []);

  const list = tab === "movie" ? movies : tv;

  const content = list.length ? (
    list.map((movie) => {
      return <MediaItemCard key={movie.id} {...movie} />;
    })
  ) : (
    <Empty
      title={`No favourite ${tab === "movie" ? "movie" : "tv show"} yet!`}
    />
  );
  return (
    <div className="px-5 md:px-10 lg:px-16 py-10">
      <div className="flex items-center gap-10 border-b border-text/75  capitalize">
        <Link
          href={"?tab=movie"}
          className={merge(
            "opacity-80 transition-colors  text-xl hover:text-primary/70 md:text-2xl duration-200 ease-linear py-2",
            tab === "movie" ? "border-b-4 border-accent font-bold" : ""
          )}
        >
          movies
        </Link>
        <Link
          href={"?tab=tv"}
          className={merge(
            "opacity-80 transition-colors  text-xl hover:text-primary/70  duration-200 ease-linear py-2",
            tab === "tv" ? "border-b-4 border-accent font-bold" : ""
          )}
        >
          tv shows
        </Link>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-x-7 gap-y-16">
        {isPending ? <Fallback /> : content}
      </ul>
    </div>
  );
}
