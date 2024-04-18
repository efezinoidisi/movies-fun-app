import Heading from "@/components/common/heading";
import Tab from "@/components/common/tab";
import InfiniteScroll from "@/components/infinite-scroll/infinite-scroll";
import { TV_ENDPOINTS } from "@/constants/data";
import { fetchList } from "@/utils/fetchList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Tab = "top_rated" | "popular" | "trending";

export const metadata: Metadata = {
  title: " - Tv shows",
  description: "explore popular, trending and top rated tv shows",
};

const tabList = [
  {
    query: "top_rated",
    title: "top-rated",
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

export default async function page({
  searchParams,
}: {
  searchParams: { tab: Tab };
}) {
  const { tab = "trending" } = searchParams;

  const endpoint = TV_ENDPOINTS[tab];

  const queryClient = new QueryClient();

  const queryKey = ["tv", tab];

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
      <section className="px-5 md:px-10 lg:px-16 pt-10 flex flex-col gap-5">
        <Heading text={`${tab.replace("_", " ")} tv shows`} />

        <Tab
          tabItems={tabList}
          defaultTab="trending"
          styles="self-end rounded-md border-white bg-white bg-opacity-90 text-sm md:text-base text-black/80"
          activeStyles="border-accent  text-accent"
        />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} type="tv" />
      </section>
    </HydrationBoundary>
  );
}
