"use client";
import Icons from "@/lib/icons";
import { useFavouriteStore } from "@/providers/favourite-store-provider";
import { merge } from "@/utils/merge";
import toast from "react-hot-toast";

type Position = "absolute" | "relative" | "static" | "fixed" | "sticky";

export default function Favourite({
  movie,
  position = "static",
  extraStyles = "",
  useIcon = "heart",
}: {
  movie: MediaItem;
  position?: Position;
  extraStyles?: string;
  useIcon?: "heart" | "like";
}) {
  const type = movie.name ? "tv" : "movies";

  const { movies, tv, addMovie, removeMovie } = useFavouriteStore(
    (state) => state
  );

  const favourites = {
    movies,
    tv,
  };
  const isFavorite = !!favourites[type].find((film) => film.id === movie.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isFavorite) {
      removeMovie(movie.id, type);

      toast.success(`${movie.name || movie.title} removed from watchlist`);
    } else {
      addMovie(movie);
      toast.success(`${movie.name || movie.title} added to watchlist`);
    }
  };
  return (
    <button
      type="button"
      className={merge(
        "px-2 group bg-black/20 py-2 rounded-full flex items-center gap-1 capitalize transition-colors duration-200 ease-in-out",
        position,
        extraStyles
      )}
      onClick={handleClick}
    >
      {useIcon === "heart" ? (
        <Icons.heart
          className={`hover:text-accent text-2xl group-active:animate-heart ${
            isFavorite ? "text-pink-500" : "text-white"
          }`}
        />
      ) : (
        <Icons.like
          className={`hover:text-accent text-2xl group-active:animate-heart ${
            isFavorite ? "text-pink-500" : "text-white"
          }`}
        />
      )}
      <span className="sr-only">
        {isFavorite ? "remove from favourites" : "add to favourites"}
      </span>
    </button>
  );
}
