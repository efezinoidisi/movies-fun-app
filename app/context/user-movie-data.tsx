'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type DataType = {
  favourites?: number[] | undefined;
  watchlist?: number[] | undefined;
};

type UserMoviesContextType = {
  data: DataType | null;
  setData: Dispatch<SetStateAction<DataType | null>>;
};

const UserMoviesContext = createContext<UserMoviesContextType | null>(null);

export function UserMoviesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const data = await res.json();
      setData(data.data);
    };
    fetchData();
  }, []);
  const value = { data, setData };
  return (
    <UserMoviesContext.Provider value={value}>
      {children}
    </UserMoviesContext.Provider>
  );
}

const useUserMoviesData = () =>
  useContext(UserMoviesContext) as UserMoviesContextType;

export default useUserMoviesData;