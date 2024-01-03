'use client';
import AuthProvider from './context/SessionContext';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataProvider from './context/user-favorites';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>{children}</DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
