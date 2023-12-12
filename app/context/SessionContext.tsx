'use client';

import { SessionProvider } from 'next-auth/react';

type Prop = {
  children: React.ReactNode;
};
//const SessionContext = createContext(null);

export default function AuthProvider({ children }: Prop) {
  return <SessionProvider>{children}</SessionProvider>;
}
