import type { StoreState } from "types/store";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import type { WatchlistActions } from "./watchlist-store";

export type FavouriteStore = StoreState & WatchlistActions;

export const defaultInitState: StoreState = {
  movies: [],
  tv: [],
};

export const createFavouritestore = (
  initState: StoreState = defaultInitState
) => {
  return createStore<FavouriteStore>()(
    persist(
      (set) => ({
        ...initState,
        addMovie: (movie) => {
          const type = movie.name ? "tv" : "movie";

          if (type === "movie") {
            set((state) => ({ movies: [...state.movies, movie] }));
            return;
          }
          set((state) => ({ tv: [movie, ...state.tv] }));
        },
        removeMovie: (id, type) => {
          if (type === "tv") {
            set((state) => ({ tv: state.tv.filter((film) => film.id !== id) }));

            return;
          }

          set((state) => ({
            movies: state.movies.filter((film) => film.id !== id),
          }));
        },
      }),
      {
        name: "mf-favourites",
      }
    )
  );
};
