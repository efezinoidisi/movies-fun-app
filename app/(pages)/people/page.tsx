import Heading from "@/components/common/heading";
import InfiniteScroll from "@/components/infinite-scroll/infinite-scroll";
import { fetchList } from "@/utils/fetchList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular celebrities",
  description: "explore popular, trending, top rated and upcoming movies",
};

export default async function page() {
  const endpoint = `/person/popular`;

  const queryKey = ["person"];
  const queryClient = new QueryClient();
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
      <section className="px-5 md:px-10 lg:px-16 pt-10  flex flex-col gap-5">
        <Heading text="popular celebrities" />
        <InfiniteScroll
          endpoint={endpoint}
          passkey={queryKey}
          type="person"
          style="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        />
      </section>
    </HydrationBoundary>
  );
}
