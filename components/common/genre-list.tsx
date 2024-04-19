"use client";
import { GENRES } from "@/constants/data";
import { merge } from "@/utils/merge";
import { useRouter } from "next/navigation";
import Button from "../Button";
type GenreWithId = {
  type: "with-id";
  genres: Genre[];
  styles?: string;
  page?: "movie" | "tv";
};

type GenreWithoutId = {
  type: "without-id";
  genres: number[];
  styles?: string;
  page?: "movie" | "tv";
};
type Props = GenreWithId | GenreWithoutId;

export default function GenreList({
  genres,
  type,
  styles = "",
  page = "movie",
}: Props) {
  const router = useRouter();

  const path = `${page}${page === "movie" ? "s" : ""}`;
  const navigate = (to: string) => {
    router.push(to);
  };
  if (type === "with-id")
    return (
      <ul className={merge("flex gap-2 flex-wrap my-5", styles)}>
        {genres.map(({ id, name }) => {
          return (
            <li
              key={id}
              className="text-base min-w-max bg-dull text-dullText rounded-md px-2 py-1 hover:bg-body transition-colors duration-200 group"
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${path}/genre/${id}`);
                }}
                className="bg-primary text-white rounded-md px-3 py-1 hover:bg-opacity-80 transition-colors duration-200"
              >
                {name}
              </Button>
            </li>
          );
        })}
      </ul>
    );

  return (
    <ul
      className={merge(
        "flex gap-2 text-xs flex-wrap gap-y-1 items-center lowercase",
        styles
      )}
    >
      {genres.map((id) => {
        return (
          <li
            key={id}
            className="bg-primary text-white rounded-md p-1 hover:bg-opacity-80 transition-colors duration-200 group"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${path}/genre/${id}`);
              }}
              className="hover:underline"
            >
              {GENRES[id]}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
