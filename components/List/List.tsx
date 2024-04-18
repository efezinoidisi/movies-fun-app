import MovieCard from "@/components/Cards/MovieCard";
import NewReleaseCard from "@/components/Cards/NewRelease";
import Person from "@/components/Cards/person";
import { merge } from "@/utils/merge";
import Link from "next/link";
import SubHeading from "../common/sub-heading";

export default function List({
  list,
  mode = "full",
  title = "",
  link = "",
  styles = "",
}: {
  list: MovieList[];
  title?: string;
  mode?: "mini" | "full";
  link?: string;
  styles?: string;
}) {
  if (!list || list?.length === 0) return null;
  return (
    <section className={merge("flex flex-col gap-5", styles)}>
      {title && <SubHeading text={title} />}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sl:grid-cols-3 gap-x-6 gap-y-12 py-10  md:gap-x-5  md:gap-y-16 ">
        {list.map((movie) => {
          if (movie?.media_type === "person") {
            return (
              <Person
                key={movie.id}
                picture={movie.profile_path}
                name={movie.name}
                id={movie.id}
              />
            );
          }

          if (mode === "mini")
            return <NewReleaseCard key={movie.id} {...movie} />;
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
      {link ? (
        <Link
          href={link}
          className="self-end border border-body px-4 py-3 bg-body hover:bg-dull text-dullText"
        >
          view more
        </Link>
      ) : null}
    </section>
  );
}
