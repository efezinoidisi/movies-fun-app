"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createWatchliststore,
  type WatchlistStore,
} from "@/lib/stores/watchlist-store";

export const WatchlistStoreContext =
  createContext<StoreApi<WatchlistStore> | null>(null);

export type WatchlistStoreProvider = {
  children: ReactNode;
};

export const WatchlistStoreProvider = ({
  children,
}: WatchlistStoreProvider) => {
  const storeRef = useRef<StoreApi<WatchlistStore>>();

  if (!storeRef.current) {
    storeRef.current = createWatchliststore();
  }

  return (
    <WatchlistStoreContext.Provider value={storeRef.current}>
      {children}
    </WatchlistStoreContext.Provider>
  );
};

export const useWatchlistStore = <T,>(
  selector: (store: WatchlistStore) => T
): T => {
  const watchlistStoreContext = useContext(WatchlistStoreContext);

  if (!watchlistStoreContext) {
    throw new Error(
      "useWatchlistStore must be used within WatchlistStoreProvider"
    );
  }

  return useStore(watchlistStoreContext, selector);
};
