import type { StoreState } from "types/store";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type WatchlistActions = {
  addMovie: (movie: MediaItem) => void;
  removeMovie: (id: number, type: "tv" | "movies") => void;
};

export type WatchlistStore = StoreState & WatchlistActions;

export const defaultInitState: StoreState = {
  movies: [],
  tv: [],
};

export const createWatchliststore = (
  initState: StoreState = defaultInitState
) => {
  return createStore<WatchlistStore>()(
    persist(
      (set) => ({
        ...initState,
        addMovie: (movie) => {
          const type = movie.name ? "tv" : "movie";

          if (type === "movie") {
            set((state) => ({ movies: [...state.movies, movie] }));
            return;
          }
          set((state) => ({ tv: [...state.tv, movie] }));
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
        name: "mf-watchlist",
      }
    )
  );
};
