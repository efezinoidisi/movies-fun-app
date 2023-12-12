import { UserMoviesProvider } from 'app/context/user-movie-data';
import AuthProvider from './context/SessionContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserMoviesProvider>
      <AuthProvider>{children}</AuthProvider>
    </UserMoviesProvider>
  );
}
