import Heading from "@/components/common/heading";
import InfiniteScroll from "@/components/infinite-scroll/infinite-scroll";
import { fetchList } from "@/utils/fetchList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: { id: string };
};

export default async function SimilarSeriesPage(props: Props) {
  const {
    params: { id },
  } = props;

  const endpoint = `/tv/${id}/similar`;

  const queryKey = ["tv", id, "similar"];
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
      <div className="py-10 bg-[#0e2439]"></div>
      <section className="px-5 md:px-10 lg:px-16 pt-10  flex flex-col gap-5">
        <Heading text="similar tv shows" />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
