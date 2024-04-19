import { getReleaseDate } from "@/utils/helpers";
import Link from "next/link";
import Favourite from "../Buttons/Favourite";
import GenreList from "../common/genre-list";
import MoviePoster from "../common/poster";
import Rating from "../common/rating";

export default function MovieCard(props: MovieList) {
  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    id,
    genre_ids,
    name,
    release_date,
    first_air_date,
  } = props;

  const type = name ? "tv" : "movie";
  const releaseYear = getReleaseDate(release_date || first_air_date, "short");

  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };
  const page = `${type}${type === "tv" ? "" : "s"}`;
  return (
    <div
      className={`flex flex-col gap-2 items-start rounded-lg  transition-colors ease-in shadow-lg pb-4  md:min-h-[18rem] border border-x-accent/50 hover:border-2 hover:shadow-al overflow-x-hidden w-full relative group`}
    >
      <Favourite
        movie={moviePayload}
        position="absolute"
        extraStyles="right-2 top-5"
      />
      <MoviePoster
        posterPath={poster_path}
        imageStyles="w-full h-full rounded-t-lg bg-cover"
        className="w-full aspect-[2/3]"
        alt={`poster for ${name || title}`}
      />

      <div className={"flex flex-col col-span-2 gap-2 pt-3 px-3"}>
        <h3 className="capitalize font-bold text-lg truncate group-hover:text-accent">
          <Link href={`/${page}/${id}`} prefetch={false}>
            {" "}
            {name || title}
          </Link>
        </h3>

        <div className="flex justify-between items-center text-xs md:text-sm min-w-max">
          <p>{releaseYear || ""}</p>
          <p className="flex items-center gap-1">
            <Rating rating={vote_average} />
            <span className="capitalize text-xs opacity-80 font-mono">
              | {type}
            </span>
          </p>
        </div>
        <GenreList genres={genre_ids} type="without-id" page={type} />
      </div>
    </div>
  );
}
