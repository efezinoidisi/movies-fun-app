import { API_BASE_URL, GENRES, OPTIONS } from '@/constants/data';

/**
 * stringGenres - convert a list of genre ids to a sorted string of genre names
 * @param {Array} genre_ids
 * @returns {string}
 */
export const stringGenres = (genre_ids: number[]) => {
  const results = genre_ids.map((id: number) => GENRES[id]);

  return results.sort().join(', ');
};

export const getAverage = (vote_average: number) => {
  return vote_average.toFixed(1);
};

// update url params

export const updateUrlParam = (
  searchParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
  payload: { type: string; key: string; value?: string }
) => {
  const params = new URLSearchParams(searchParams);
  const { type, key, value } = payload;
  switch (type) {
    case 'delete':
      params.delete(key);
      return params.toString();
    case 'update':
      params.set(key, value as string);
      return params.toString();
    default:
      return params.toString();
  }
};

// get movie trailer from videos

export function getTrailerKey(videos: VideoType[]) {
  const trailer = videos.find(({ type }) => type === 'Trailer');

  return trailer?.key;
}

// get random movies
export function getRandomMovies(movies: MovieList[], length: number) {
  const getRandomIndex = () => Math.floor(Math.random() * movies.length);

  const values: { [key: string]: MovieList } = {};

  while (Object.keys(values).length < length) {
    const index = getRandomIndex();
    if (values[index]) continue;
    values[index] = movies[index];
  }

  return Object.values(values);
}

// check and trim a given string
export function checkTrimString(originalString: string, maxLength: number) {
  return originalString.length > maxLength
    ? `${originalString.substring(0, maxLength)}...`
    : originalString;
}

// covert time in seconds to hours and minutes
export function getRuntime(minutes: number) {
  if (minutes === 0) return '-';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursStr = hours ? `${hours}h` : '';
  const minsStr = remainingMinutes ? `${remainingMinutes}m` : '';
  return hoursStr + minsStr;
}

// get english name of language
export async function getLanguage(isoKey: string) {
  const endpoint = 'configuration/languages';
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: OPTIONS,
  });

  if (!res.ok) throw new Error('An error occurred');
  const data: Promise<Language[]> = await res.json();
  const languages = await data;
  const language = languages.find((language) => language.iso_639_1 === isoKey);

  return language?.english_name;
}

// get english name of country
export async function getCountry(isoKey: string) {
  const endpoint = 'configuration/countries';
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: OPTIONS,
  });

  if (!res.ok) throw new Error('An error occurred');
  const data: Promise<Country[]> = await res.json();
  const countries = await data;
  const country = countries.find((country) => country.iso_3166_1 === isoKey);

  return country?.english_name;
}

export function numberToDollarString(value: number) {
  if (!value) return '-';
  const units = [
    { unit: 'quadrillion', divisor: 1e15 },
    { unit: 'trillion', divisor: 1e12 },
    { unit: 'billion', divisor: 1e9 },
    { unit: 'million', divisor: 1e6 },
    { unit: 'thousand', divisor: 1e3 },
    { unit: '', divisor: 1 },
  ];

  for (const unit of units) {
    if (Math.abs(value) >= unit.divisor) {
      const formattedValue = Math.floor(value / unit.divisor);
      const minimumFractionDigits = unit.unit ? 0 : 2;
      return (
        formattedValue.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits,
        }) + (unit.unit ? ` ${unit.unit}` : '')
      );
    }
  }

  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

export function getReleaseDate(value: string) {
  if (!value) return '-';

  const date = new Date(value);
  return date.toLocaleDateString('en-Us', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  });
}
