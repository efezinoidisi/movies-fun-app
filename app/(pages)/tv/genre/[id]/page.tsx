import Heading from "@/components/common/heading";
import Error from "@/components/error/error";
import InfiniteScroll from "@/components/infinite-scroll/infinite-scroll";
import { GENRES } from "@/constants/data";
import { fetchList } from "@/utils/fetchList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: { id: string };
};

export default async function page(props: Props) {
  const {
    params: { id },
  } = props;

  const endpoint = `discover/tv?with_genres=${id}`;

  const queryKey = ["tv", "genre", id];

  const isIdValid = Object.keys(GENRES).includes(id);

  if (!isIdValid) return <Error message="genre not found" />;

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

  const text = GENRES[+id] ?? "";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-10"></div>
      <section className="px-5 md:px-10 lg:px-16 pt-10  flex flex-col gap-5">
        <Heading text={text} />
        <InfiniteScroll endpoint={endpoint} passkey={queryKey} />
      </section>
    </HydrationBoundary>
  );
}
