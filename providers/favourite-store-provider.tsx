"use client";

import {
  createFavouritestore,
  type FavouriteStore,
} from "@/lib/stores/favourite-store";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

export const FavouriteStoreContext =
  createContext<StoreApi<FavouriteStore> | null>(null);

export type FavouriteStoreProvider = {
  children: ReactNode;
};

export const FavouriteStoreProvider = ({
  children,
}: FavouriteStoreProvider) => {
  const storeRef = useRef<StoreApi<FavouriteStore>>();

  if (!storeRef.current) {
    storeRef.current = createFavouritestore();
  }

  return (
    <FavouriteStoreContext.Provider value={storeRef.current}>
      {children}
    </FavouriteStoreContext.Provider>
  );
};

export const useFavouriteStore = <T,>(
  selector: (store: FavouriteStore) => T
): T => {
  const favouriteStoreContext = useContext(FavouriteStoreContext);

  if (!favouriteStoreContext) {
    throw new Error(
      "useFavouriteStore must be used within FavoutiteStoreProvider"
    );
  }

  return useStore(favouriteStoreContext, selector);
};
