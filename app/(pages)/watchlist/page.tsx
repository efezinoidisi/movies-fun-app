import UserWatchlist from "@/components/List/user-watchlist";

type WatchlistProps = {
  searchParams: {
    tab: "movie" | "tv";
  };
};

export default function WatchlistPage({
  searchParams: { tab = "movie" },
}: WatchlistProps) {
  return (
    <div>
      <div className="py-12" />

      <h2 className="bg-list bg-bottom bg-no-repeat capitalize bg-cover py-16 text-white text-3xl text-center">
        watchlist
      </h2>

      <UserWatchlist tab={tab} />
    </div>
  );
}
