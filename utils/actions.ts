"use server";

export async function addToWatchList(movie: MediaItem) {
  const type = movie?.name ? "tv" : "movies";
}

export async function removeFromWatchList(movie: MediaItem) {
  const type = movie?.name ? "tv" : "movies";
}
export async function addToFavorites(movie: MediaItem) {
  const type = movie.name ? "tv" : "movies";
}

export async function removeFromFavorites(movie: MediaItem) {
  const type = movie.name ? "tv" : "movies";
}
