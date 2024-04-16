"use client";
import { merge } from "@/utils/merge";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../Button";

type Props = {
  movie: MediaItem;
  showText?: boolean;
  border?: boolean;
  extraStyles?: string;
};

export default function AddWatchlistButton(props: Props) {
  const queryClient = useQueryClient();
  const { movie, showText = false, border = false, extraStyles = "" } = props;

  const type = movie?.name ? "tv" : "movies";
  // const movieInWatchList = watchlist[type].find((film) => film.id === movie.id);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // toast.success(
    //   `${movie.name || movie.title} ${
    //     movieInWatchList === undefined
    //       ? 'added to watchlist'
    //       : 'removed from watchlist'
    //   }`
    // );
  };

  return (
    <Button
      className={merge(
        `py-2 md:py-4 truncate hover:bg-white/80 hover:text-background transition-colors duration-200 ease-linear md:min-w-[11rem] capitalize px-2 md:px-4 rounded-lg flex gap-2 items-center text-sm font-medium group cursor-pointer h-12 w-full justify-center`,
        border && "border",
        extraStyles
      )}
      type="button"
      onClick={handleClick}
      title="add to watchlist"
    >
      {/* {movieInWatchList ? (
        <Icons.bookmarkCheck className="text-xl" />
      ) : (
        <Icons.bookmark className="text-xl" />
      )}
      {showText && (movieInWatchList ? "remove" : "add watchlist")} */}
      add
    </Button>
  );
}
