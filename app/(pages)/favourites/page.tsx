import UserFavourites from "@/components/List/user-favourites";

type FavouritesProps = {
  searchParams: {
    tab: "movie" | "tv";
  };
};

export default function FavouritesPage({
  searchParams: { tab = "movie" },
}: FavouritesProps) {
  return (
    <div>
      <div className="py-12" />

      <h2 className="bg-list bg-bottom bg-no-repeat capitalize bg-cover py-16 text-white text-3xl text-center">
        favourites
      </h2>

      <UserFavourites tab={tab} />
    </div>
  );
}
