"use client";
import { fetchClientList } from "@/utils/fetchList";
import { merge } from "@/utils/merge";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import NewReleaseCard from "../Cards/NewRelease";
import Person from "../Cards/person";
import SubHeading from "../common/sub-heading";
import Error from "../error/error";
import Loader from "../loaders/loader";
import Ring from "../loaders/ring";

type Props = {
  endpoint: string;
  passkey: string[];
  title?: string;
  type?: "movie" | "tv" | "person";
  style?: string;
};

export default function InfiniteScroll(props: Props) {
  const { endpoint, passkey, title, type = "movie", style = "" } = props;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: passkey,
      queryFn: ({ pageParam = 1 }) => fetchClientList(endpoint, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (
          lastPage?.page === lastPage?.total_pages ||
          lastPage.total_pages === 0
        ) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      staleTime: Infinity,
    });
  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastNodeRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((movies) => {
        if (movies[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "pending")
    return (
      <div className="flex flex-col items-center">
        <Ring />
      </div>
    );

  if (status === "error") return <Error message="error fetching data" />;

  const content =
    type === "person"
      ? data?.pages?.map((pg) => {
          return pg?.results?.map((person: Person) => {
            return (
              <Person
                key={person.id}
                id={person.id}
                name={person.name}
                picture={person.profile_path}
              />
            );
          });
        })
      : data?.pages?.map((pg) => {
          return pg?.results?.map((movie: MovieList) => {
            return <NewReleaseCard key={movie.id} {...movie} />;
          });
        });

  return (
    <section className="w-full">
      {title && <SubHeading text={title} />}
      <div
        className={merge(
          "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sl:grid-cols-3 gap-2 gap-y-16  md:gap-x-5 ",
          style
        )}
      >
        {content}
      </div>
      <div
        className={merge(
          `invisible flex flex-col items-center`,

          isFetchingNextPage && "visible"
        )}
        ref={lastNodeRef}
      >
        <Loader background="bg-accent/80" />
      </div>
    </section>
  );
}
