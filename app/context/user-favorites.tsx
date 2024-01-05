'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

enum DataActionType {
  ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE',
  ADD_FAVORITE_TV = 'ADD_FAVORITE_TV',
  ADD_WATCHLIST_TV = 'ADD_WATCHLIST_TV',
  ADD_WATCHLIST_MOVIE = 'ADD_WATCHLIST_MOVIE',
  REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE',
  REMOVE_FAVORITE_TV = 'REMOVE_FAVORITE_TV',
  REMOVE_WATCHLIST_TV = 'REMOVE_WATCHLIST_TV',
  REMOVE_WATCHLIST_MOVIE = 'REMOVE_WATCHLIST_MOVIE',
}

type UpdateAll = {
  type: 'UPDATE_ALL';
  payload: DataState;
};

type UpdateOne = {
  type: DataActionType;
  payload: MediaItem;
};
type DataAction = UpdateAll | UpdateOne;

type DataState = {
  favorites: {
    tv: MediaItem[];
    movies: MediaItem[];
  };
  watchlist: {
    tv: MediaItem[];
    movies: MediaItem[];
  };
};

function dataReducer(state: DataState, action: DataAction) {
  const { type, payload } = action;
  switch (type) {
    case DataActionType.ADD_FAVORITE_MOVIE: {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          movies: [payload, ...state.favorites.movies],
        },
      };
    }
    case DataActionType.REMOVE_FAVORITE_MOVIE: {
      const movies = state.favorites.movies.filter(
        (movie) => movie.id !== payload.id
      );
      return {
        ...state,
        favorites: {
          ...state.favorites,
          movies,
        },
      };
    }
    case DataActionType.ADD_FAVORITE_TV: {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          tv: [payload, ...state.favorites.tv],
        },
      };
    }
    case DataActionType.REMOVE_FAVORITE_TV: {
      const tv = state.favorites.tv.filter((movie) => movie.id !== payload.id);
      return {
        ...state,
        favorites: {
          ...state.favorites,
          tv,
        },
      };
    }
    case DataActionType.ADD_WATCHLIST_MOVIE: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          movies: [payload, ...state.watchlist.movies],
        },
      };
    }
    case DataActionType.REMOVE_WATCHLIST_MOVIE: {
      const movies = state.watchlist.movies.filter(
        (movie) => movie.id !== payload.id
      );
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          movies,
        },
      };
    }
    case DataActionType.ADD_WATCHLIST_TV: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          tv: [payload, ...state.watchlist.tv],
        },
      };
    }
    case DataActionType.REMOVE_WATCHLIST_TV: {
      const tv = state.watchlist.tv.filter((movie) => movie.id !== payload.id);
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          tv,
        },
      };
    }
    case 'UPDATE_ALL': {
      return { ...payload };
    }
    default:
      return state;
  }
}

type DataContextType = DataState & {
  addFavorite: (movie: MediaItem, type: 'tv' | 'movie') => void;
  removeFavorite: (movie: MediaItem, type: 'tv' | 'movie') => void;
  addWatchlist: (movie: MediaItem, type: 'tv' | 'movie') => void;
  removeWatchlist: (movie: MediaItem, type: 'tv' | 'movie') => void;
  dataStatus: string;
};
const DataContext = createContext<DataContextType | null>(null);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    favorites: {
      tv: [],
      movies: [],
    },
    watchlist: {
      tv: [],
      movies: [],
    },
  };
  const { status } = useSession();

  const [data, dispatch] = useReducer(dataReducer, initialState);
  const [dataStatus, setDataStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setDataStatus('loading');
      const res = await fetch('/api/data');
      const body = await res.json();
      setDataStatus('success');
      dispatch({
        type: 'UPDATE_ALL',
        payload: body,
      });
    };
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  const addFavorite = useCallback((movie: MediaItem, type: 'tv' | 'movie') => {
    const actionType =
      type === 'tv'
        ? DataActionType.ADD_FAVORITE_TV
        : DataActionType.ADD_FAVORITE_MOVIE;

    dispatch({
      type: actionType,
      payload: movie,
    });
  }, []);

  const addWatchlist = useCallback((movie: MediaItem, type: 'tv' | 'movie') => {
    const actionType =
      type === 'tv'
        ? DataActionType.ADD_WATCHLIST_TV
        : DataActionType.ADD_WATCHLIST_MOVIE;

    dispatch({
      type: actionType,
      payload: movie,
    });
  }, []);

  const removeFavorite = useCallback(
    (movie: MediaItem, type: 'tv' | 'movie') => {
      const actionType =
        type === 'tv'
          ? DataActionType.REMOVE_FAVORITE_TV
          : DataActionType.REMOVE_FAVORITE_MOVIE;

      dispatch({
        type: actionType,
        payload: movie,
      });
    },
    []
  );

  const removeWatchlist = useCallback(
    (movie: MediaItem, type: 'tv' | 'movie') => {
      const actionType =
        type === 'tv'
          ? DataActionType.REMOVE_WATCHLIST_TV
          : DataActionType.REMOVE_WATCHLIST_MOVIE;

      dispatch({
        type: actionType,
        payload: movie,
      });
    },
    []
  );

  const value = {
    ...data,
    addFavorite,
    removeFavorite,
    addWatchlist,
    removeWatchlist,
    dataStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export function useData() {
  return useContext(DataContext) as DataContextType;
}

export default DataProvider;
