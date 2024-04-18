import { popularMoviesOptions } from "@/constants/data";
import Link from "next/link";
import MovieCard from "../Cards/MovieCard";
import NewReleaseCard from "../Cards/NewRelease";
import PopularMovieCard from "../Cards/PopularMovieCard";
import CustomCarousel from "../Slider/carousel";
import SubHeading from "../common/sub-heading";

type SectionProps = {
  title: string;
  variant: string;
  results: MovieList[];
  href: string;
};

export default function Section(props: SectionProps) {
  const { title, variant, results, href } = props;
  return (
    <section className="border-b border-text/70 flex flex-col gap-y-4 last-of-type:border-b-0 pt-4">
      <SubHeading text={title} />
      <CustomCarousel
        options={variant === "popular" ? popularMoviesOptions : null}
      >
        {results?.map((result, index) => {
          if (variant === "popular") {
            return (
              <PopularMovieCard index={index} key={result.id} {...result} />
            );
          }

          if (variant === "movie") {
            return <MovieCard key={result.id} {...result} />;
          }

          return <NewReleaseCard key={result.id} {...result} />;
        })}
      </CustomCarousel>
      <Link
        href={href}
        className="self-end border border-text px-4 py-3  hover:bg-primary/50"
      >
        view more
      </Link>
    </section>
  );
}
