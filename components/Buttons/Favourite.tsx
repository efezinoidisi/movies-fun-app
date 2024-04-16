"use client";
import Icons from "@/lib/icons";
import { merge } from "@/utils/merge";

type Position = "absolute" | "relative" | "static" | "fixed" | "sticky";

const initialState = {
  favorites: {
    tv: [],
    movies: [],
  },
  watchlist: {
    tv: [],
    movies: [],
  },
};

export default function Favourite({
  movie,
  position = "static",
  extraStyles = "",
}: {
  movie: MediaItem;
  position?: Position;
  extraStyles?: string;
}) {
  const type = movie.name ? "tv" : "movie";

  // const isFavorite =
  //   type === 'tv'
  //     ? favorites.tv.find((film) => film.id === movie.id)
  //     : favorites.movies.find((film) => film.id === movie.id);

  const handleAddtoFavourites = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // toast.success(
    //   `${movie.name || movie.title} ${
    //     isFavorite === undefined
    //       ? 'added to favorites'
    //       : 'removed from favorites'
    //   }`
    // );
  };
  return (
    <button
      className={merge(
        "px-2 group bg-black/20 py-2 rounded-full flex items-center gap-1 capitalize transition-colors duration-200 ease-in-out",
        position,
        extraStyles
      )}
      onClick={handleAddtoFavourites}
    >
      <Icons.heart />
      {/* // className={`hover:text-accent text-2xl group-active:animate-heart ${
        //   isFavorite !== undefined ? 'text-pink-500' : 'text-white'
        // }`} */}
    </button>
  );
}
