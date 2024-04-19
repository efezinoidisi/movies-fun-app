import SubHeading from "@/components/common/sub-heading";
import { fetchList } from "@/utils/fetchList";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400; // revalidate after 24 hours(1 day)

export const metadata: Metadata = {
  title: "Genres",
  description: "explore all movies and tv show genres",
};

export default async function GenresPage() {
  const movieGenresEndpoint = "genre/movie/list";
  const tvGenresEndpoint = "genre/tv/list";

  const allData: Promise<[{ genres: Genre[] }, { genres: Genre[] }]> =
    Promise.all([fetchList(movieGenresEndpoint), fetchList(tvGenresEndpoint)]);

  const [{ genres: movieGenres }, { genres: tvGenres }] = await allData;

  return (
    <section className="px-5 md:px-10 lg:px-16 pb-10">
      <div className="py-12"></div>

      <div className="grid grid-cols-2 place-items-start justify-items-center gap-5">
        <div className="flex flex-col gap-5 border-r border-body items-center pr-5 md:border-none">
          <SubHeading text="movie genres" />
          <Genre genres={movieGenres} type="movies" />
        </div>
        <div className="flex flex-col gap-5 items-center">
          <SubHeading text="tv genres" />
          <Genre genres={tvGenres} type="tv" />
        </div>
      </div>
    </section>
  );
}

const Genre = ({
  genres,
  type,
}: {
  genres: Genre[];
  type: "tv" | "movies";
}) => {
  const content = genres?.map(({ id, name }) => (
    <li
      key={id}
      className="text-left px-2 py-2 hover:bg-dull min-fit rounded-lg hover:text-accent transition-colors duration-200 ease-in-out"
    >
      <Link
        href={`/${type}/genre/${id}`}
        className="underline"
        prefetch={false}
      >
        {name}
      </Link>
    </li>
  ));

  return <ul className="">{content}</ul>;
};
