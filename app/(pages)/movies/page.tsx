import Heading from "@/components/common/heading";
import Tab from "@/components/common/tab";
import InfiniteScroll from "@/components/infinite-scroll/infinite-scroll";
import { MOVIE_ENDPOINTS } from "@/constants/data";
import { fetchList } from "@/utils/fetchList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "explore popular, trending, top rated and upcoming movies",
};

type Tab = "top_rated" | "upcoming" | "popular" | "trending";

const tabList = [
  {
    query: "top_rated",
    title: "top-rated",
  },
  {
    query: "upcoming",
    title: "upcoming",
  },
  {
    query: "trending",
    title: "trending",
  },
  {
    query: "popular",
    title: "popular",
  },
];

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { tab: Tab };
}) {
  const { tab = "trending" } = searchParams;

  const endpoint = MOVIE_ENDPOINTS[tab];

  const queryClient = new QueryClient();

  const queryKey = ["movies", tab];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: () => fetchList(endpoint),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
    pages: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10"></div>
      <section className="px-5 pt-10  flex flex-col gap-5  md:px-10 lg:px-16">
        <Heading text={`${tab.replace("_", " ")} movies`} />

        <Tab
          tabItems={tabList}
          defaultTab="trending"
          styles="self-center md:self-end rounded-md border-white bg-white bg-opacity-90 text-black/80"
          activeStyles="border-accent  text-accent"
        />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
