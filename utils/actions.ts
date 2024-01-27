'use server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';
import { redirect } from 'next/navigation';

export async function fetchUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('unauthorized');
  }

  const email = session?.user?.email;
  await connectDb();
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('user not found');
  }

  return user;
}

export async function addToWatchList(movie: MediaItem) {
  const user = await fetchUser();
  const type = movie?.name ? 'tv' : 'movies';
  if (user.watchlist[type].includes(movie.id)) {
    return;
  }
  user.watchlist[type].push(movie);
  await user.save();
}

export async function removeFromWatchList(movie: MediaItem) {
  const user = await fetchUser();
  const type = movie?.name ? 'tv' : 'movies';

  const updatedWatchlist = user.watchlist[type].filter(
    (film: MediaItem) => film.id !== movie.id
  );
  user.watchlist[type] = updatedWatchlist;
  await user.save();
}
export async function addToFavorites(movie: MediaItem) {
  const user = await fetchUser();
  const type = movie.name ? 'tv' : 'movies';
  if (user.favorites[type].includes(movie.id)) {
    return;
  }
  user.favorites[type].push(movie);
  await user.save();
}

export async function removeFromFavorites(movie: MediaItem) {
  const user = await fetchUser();
  const type = movie.name ? 'tv' : 'movies';
  const updatedFavorites = user.favorites[type].filter(
    (film: MediaItem) => film.id !== movie.id
  );
  user.favorites[type] = updatedFavorites;
  await user.save();
}

export async function getFavorites() {
  const user = await fetchUser();
  return user.favourites;
}

export async function getWatchList() {
  const user = await fetchUser();
  return user.watchlist;
}

export async function fetchUserDetails() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('unauthorized');
  }

  const email = session?.user?.email;
  const user: null | {
    _id: string;
    favorites: { tv: MediaItem[]; movies: MediaItem[] };
    username: string;
    watchlist: { tv: MediaItem[]; movies: MediaItem[] };
    createdAt: string;
    email: string;
  } = await User.findOne({ email }).lean();
  if (!user) {
    throw new Error('user not found');
  }

  return {
    id: JSON.parse(JSON.stringify(user._id)),
    username: user.username,
    favorites: { tv: user.favorites.tv, movies: user.favorites.movies },
    watchlist: { tv: user.watchlist.tv, movies: user.watchlist.movies },
    email: user.email,
    created_at: user.createdAt,
  };
}

export async function handleSearchSubmit(query: string) {
  if (!query) return;
  redirect(`/search?query=${query}`);
}

export async function updateUser({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('unauthorized');
  }

  const userEmail = session?.user?.email;
  const user = await User.findOne({ userEmail });
  if (!user) {
    throw new Error('user not found');
  }

  if (email) {
    user.email = email;
  }

  if (username) {
    user.username = username;
  }
  await user.save();
}
