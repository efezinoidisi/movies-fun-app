"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("page", "1");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      autoFocus
      type="search"
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder="search for a movie,tv or celebrity"
      className="text-white bg-inherit px-5 py-2 rounded-lg mx-7 md:mx-14 lg:mx-32 outline-none  focus:border-opacity-100 border border-opacity-90 focus:border-accent/60 focus:shadow-sm"
    />
  );
}
