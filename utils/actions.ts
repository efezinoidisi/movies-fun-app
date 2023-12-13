'use server';
import { connectDb } from '@/lib/db';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import authOptions from 'config/authOptions';

export async function addToWatchList(id: number) {
  const user = await fetchUser();
  if (user.watchlist.includes(id)) {
    return;
  }
  user.watchlist.push(id);
  await user.save();
}

export async function removeFromWatchList(id: number) {
  const user = await fetchUser();
  const updatedWatchlist = user.watchlist.filter(
    (movieId: number) => movieId !== id
  );
  user.watchlist = updatedWatchlist;
  await user.save();
}
export async function addToFavourites(id: number) {
  const user = await fetchUser();
  if (user.favourites.includes(id)) {
    return;
  }
  user.favourites.push(id);
  await user.save();
}

export async function removeFromFavourites(id: number) {
  const user = await fetchUser();
  const updatedFavourites = user.favourites.filter(
    (movieId: number) => movieId !== id
  );
  user.favourites = updatedFavourites;
  await user.save();
}

export async function getFavourites() {
  const user = await fetchUser();
  return user.favourites;
}

export async function getWatchList() {
  const user = await fetchUser();
  return user.watchlist;
}

async function fetchUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('please login in!');
  }

  const email = session.user.email;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('user not found');
  }

  return user;
}
