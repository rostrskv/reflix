import { CONSTANTS } from "../constants";

function getTmdbUrl(url) {
  const baseUrl = CONSTANTS.tmdbBaseUrl;
  const fullUrl = new URL(url, baseUrl);
  fullUrl.searchParams.set("language", "en-US");
  fullUrl.searchParams.set("api_key", CONSTANTS.tmdbApiKey);
  return fullUrl;
}

async function callMovieApi(url) {
  const fullUrl = getTmdbUrl(url);
  const response = await fetch(fullUrl);
  const result = await response.json();
  return result;
}

/**
 * Get tmdb configuration
 * @example 
   {
    images: {
      base_url: "http://image.tmdb.org/t/p/",
      secure_base_url: "https://image.tmdb.org/t/p/",
      backdrop_sizes: ["w300", "w780", "w1280", "original"],
      logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
      poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original",
      ],
      profile_sizes: ["w45", "w185", "h632", "original"],
      still_sizes: ["w92", "w185", "w300", "original"],
    },
  }
 */
async function getConfig() {
  return callMovieApi("/3/configuration");
}

let imageBaseUrl;
async function getImageBaseUrl() {
  return (
    imageBaseUrl ?? (imageBaseUrl = (await getConfig()).images.secure_base_url)
  );
}

/**
 * Get lists of movies from API
 * @returns {Promise<{userId:number, id:number, title:string, overview:string, poster_path:string}[]>}
 */
async function getMovieList(url) {
  const imageBaseUrl = await getImageBaseUrl();
  const result = await callMovieApi(url);

  return result.results
    .slice(0, CONSTANTS.movieListLimit)
    .map(({ id, title, overview, poster_path }) => ({
      id,
      title,
      overview,
      poster_path: poster_path && `${imageBaseUrl}w185${poster_path}`,
    }));
}

/**
 * Get lists of trending movies from API
 */
export async function getTrending() {
  return getMovieList("/3/trending/movie/day");
}

/**
 * Get searched movies
 */
export async function searchMovie(query) {
  return getMovieList(`/3/search/movie?query=${query}`);
}

export async function getMovieDetail(movieId) {
  const imageBaseUrl = await getImageBaseUrl();
  const movie = await callMovieApi(`/3/movie/${movieId}`);
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: `${imageBaseUrl}w500${movie.poster_path}`,
  };
}
