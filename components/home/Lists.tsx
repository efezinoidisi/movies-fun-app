import { fetchList } from "@/utils/fetchList";
import Section from "./section";

const moviesEndpoint = "movie/upcoming";
const seriesEndpoint = "tv/popular";
const trendingSeriesEndpoint = "trending/tv/day";

export default async function Lists() {
  const allResults: Promise<[FetchData, FetchData, FetchData]> = Promise.all([
    fetchList(moviesEndpoint),
    fetchList(seriesEndpoint),
    fetchList(trendingSeriesEndpoint),
  ]);

  const [
    { results: upcomingMovies },
    { results: popularSeries },
    { results: trendingSeries },
  ] = await allResults;

  const listItems: {
    id: number;
    variant: "new" | "popular" | "movie";
    results: MovieList[];
    href: string;
    title: string;
    type: "movie" | "tv";
  }[] = [
    {
      id: 0,
      variant: "new",
      results: trendingSeries,
      href: "/tv?tab=trending",
      title: "trending tv shows",
      type: "movie",
    },
    {
      id: 1,
      variant: "new",
      results: upcomingMovies,
      href: "/movies?tab=upcoming",
      title: "upcoming movies",
      type: "movie",
    },
    {
      id: 2,
      variant: "new",
      results: popularSeries,
      href: "/tv?tab=popular",
      title: "popular tv shows",
      type: "tv",
    },
  ];

  return (
    <div className="flex flex-col gap-y-10">
      {listItems?.map((item) => {
        return <Section key={item.id} {...item} />;
      })}
    </div>
  );
}
