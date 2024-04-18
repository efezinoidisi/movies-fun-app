import List from "@/components/List/List";
import Search from "@/components/Search";
import Pagination from "@/components/common/pagination";
import Fallback from "@/components/loaders/fallback";
import { fetchList } from "@/utils/fetchList";
import Image from "next/image";
import { Suspense } from "react";
type Props = {
  searchParams?: { query?: string; page?: string };
};

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams?.query;
  const page = +(searchParams?.page ?? "1");

  const res: Promise<FetchData> = await fetchList(
    `search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
  );

  const { results, total_pages } = await res;

  return (
    <section className="flex flex-col gap-3 px-5 md:px-10 lg:px-16 pt-5 mt-7">
      <div className="py-10" />
      <h2 className="capitalize text-xl text-center font-semibold tracking-wider sr-only">
        search page
      </h2>
      <Suspense fallback={<Fallback />}>
        <Search />
      </Suspense>
      {query ? (
        <section className="">
          <h3 className="pb-7">{`showing results for "${query}"`}</h3>
          <List list={results} mode="full" />
          {total_pages > 1 && (
            <Pagination
              page={page}
              totalPages={total_pages}
              searchParams={searchParams}
            />
          )}
        </section>
      ) : (
        <div className="relative flex justify-center items-center">
          <Image
            src={"/people-search-amico.svg"}
            width={400}
            alt=""
            height={500}
            unoptimized
          />
          <p className="absolute bottom-1 text-[0.5rem] right-0">
            <a href="https://storyset.com/people">
              People illustrations by Storyset
            </a>
          </p>
        </div>
      )}
      {query && results?.length === 0 && (
        <p className="text-center">{`no match found for "${query}"`}</p>
      )}
    </section>
  );
}
