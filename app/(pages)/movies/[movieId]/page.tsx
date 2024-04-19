import List from "@/components/List/List";
import Casts from "@/components/common/cast";
import Details from "@/components/common/details";
import HeroContent from "@/components/common/hero-content";
import Review from "@/components/common/review";
import { fetchList } from "@/utils/fetchList";
import { getLanguage, getRuntime, getTrailerKey } from "@/utils/helpers";
import Link from "next/link";

type Props = {
  params: { movieId: string };
};

export const revalidate = 86400; // revalidate after 24 hours(1 day)

export async function generateMetadata({ params: { movieId } }: Props) {
  const movie = await fetchList(`movie/${movieId}`);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function MoviePage({ params: { movieId } }: Props) {
  const movieData: Promise<MovieDetail> = await fetchList(
    `movie/${movieId}?append_to_response=videos,images,credits,recommendations,reviews,similar`
  );
  const {
    id,
    backdrop_path,
    credits,
    recommendations,
    similar,
    videos,
    title,
    reviews,
    release_date,
    genres,
    overview,
    runtime,
    vote_average,
    poster_path,
    original_language,
    budget,
    revenue,
    images,
  } = await movieData;

  const date = new Date(release_date);

  const releaseYear = release_date ? `${date.getFullYear()}` : null;

  const trailerKey = getTrailerKey(videos.results);

  const listItems = [
    {
      title: "more like this",
      movies: similar.results.slice(0, 10),
      link: `/movies/${id}/similar`,
    },
    {
      title: "recommendations",
      movies: recommendations.results.slice(0, 10),
      link: `/movies/${id}/recommendations`,
    },
  ];

  const displayedRuntime = runtime > 0 ? getRuntime(runtime) : null;

  const directors = credits.crew.filter((crew) => crew.job === "Director");

  const directorNode =
    directors?.length > 0
      ? directors.map((director) => (
          <Link
            href={`/people/${director.id}`}
            className="underline hover:text-accent transition-colors duration-150 group pr-2"
            key={director.id}
          >
            {director.name}
            <span className="group-last:hidden">,</span>
          </Link>
        ))
      : "-";

  const language = await getLanguage(original_language);
  const genre_ids = genres.map((genre) => genre.id);
  const payload: MediaItem = {
    id,
    backdrop_path,
    genre_ids,
    title,
    vote_average,
    name: "",
  };

  return (
    <>
      <HeroContent
        releaseYear={releaseYear}
        trailer={trailerKey as string}
        payload={payload}
        type={"movie"}
        runtime={displayedRuntime}
        poster={poster_path}
      />

      <section className=" flex flex-col gap-5 md:gap-7 lg:gap-10 px-5 md:px-10 lg:px-16 mb-5 pb-5">
        <Details
          type="movie"
          name={title}
          runtime={displayedRuntime as string}
          language={language || ""}
          director={directorNode}
          overview={overview}
          genres={genres}
          poster={poster_path}
          rating={vote_average}
          release={release_date}
          budget={budget}
          revenue={revenue}
          payload={payload}
        />
        <Casts casts={credits.cast} />

        <Review
          reviews={reviews.results}
          pages={reviews.total_pages}
          movieId={id}
        />

        <>
          {listItems.map((item) => (
            <List
              list={item.movies}
              title={item.title}
              link={item.link}
              key={item.title}
            />
          ))}
        </>
      </section>
    </>
  );
}
