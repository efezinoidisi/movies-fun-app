"use client";
import { WatchlistStoreProvider } from "@/providers/watchlist-store-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 60 * 24,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistStoreProvider>{children}</WatchlistStoreProvider>
    </QueryClientProvider>
  );
}
