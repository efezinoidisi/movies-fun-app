"use client";
import { GENRES, IMG_URL } from "@/constants/data";
import { getReleaseDate } from "@/utils/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddWatchlistButton from "../Buttons/AddWatchlistButton";
import WatchTrailerButton from "../Buttons/WatchTrailerButton";

export default function Hero({ movies }: { movies: MovieList[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  // movie currently shown;
  let currentMovie = movies[currentIndex];

  const releaseYear = getReleaseDate(currentMovie.release_date, "short");

  // control slide change
  const handleToggle = () => {
    if (!isPaused) {
      const id = setInterval(() => {
        setCurrentIndex((prev) => {
          return prev === 4 ? 0 : prev + 1;
        });
      }, 5000);
      return () => clearInterval(id);
    }
  };

  useEffect(handleToggle, [isPaused]);

  const { id, genre_ids, backdrop_path, name, title, vote_average } =
    currentMovie;
  const moviePayload: MediaItem = {
    id,
    genre_ids,
    backdrop_path,
    vote_average,
    name,
    title,
  };

  const updateIsPaused = (value: boolean) => {
    setIsPaused(value);
  };

  return (
    <section
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.70) 100%),url(${IMG_URL}${backdrop_path})`,
      }}
      onMouseEnter={() => updateIsPaused(true)}
      onMouseLeave={() => updateIsPaused(false)}
      className="min-h-screen w-full hero lg:header text-white bg-opacity-30 flex flex-col justify-end gap-10 md:px-12 px-5  pb-14 md:pb-20 lg:max-h-screen "
    >
      <div className="flex flex-col justify-between gap-10 md:gap-0 md:flex-row">
        <div className="flex flex-col gap-3 md:max-w-[30rem]">
          <span className="bg-opacity-50 bg-black py-1 px-2 rounded-full capitalize w-fit text-xs">
            movie
          </span>

          <h2 className="capitalize text-4xl md:text-5xl lg:text-6xl min-w-min text-pretty line-clamp-2">
            <Link
              href={`/movies/${id}`}
              className="hover:text-blue-500 hover:underline"
            >
              {title}
            </Link>
          </h2>

          <ul className="list-inside flex gap-3 text-sm text-white opacity-70 flex-wrap">
            <li className="">{releaseYear || ""}</li>
            {genre_ids.map((id) => {
              return (
                <li key={id} className="list-disc">
                  {GENRES[id]}
                </li>
              );
            })}
          </ul>
          <p className="md:max-w-md leading-6 tracking-wide opacity-90 md:text-lg line-clamp-5">
            {currentMovie.overview}
          </p>

          <div className="flex gap-2 items-center lg:w-5/6">
            <WatchTrailerButton
              path={`/trailer?movieId=${id}&title=${title}`}
            />
            <AddWatchlistButton
              movie={moviePayload}
              showText={true}
              border={true}
            />
          </div>
        </div>
        <div className=" flex gap-2 items-end justify-center ">
          {movies.map(({ id }, index) => (
            <span
              key={id}
              className={`transition-all duration-500 ease-linear ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              } cursor-pointer w-2 h-2 rounded-full hover:bg-white/80`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
