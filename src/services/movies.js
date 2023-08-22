import { CONSTANTS } from "../constants";

function getTmdbUrl(url) {
  const baseUrl = "https://api.themoviedb.org/";
  const fullUrl = new URL(url, baseUrl);
  fullUrl.searchParams.set("language", "en-US");
  fullUrl.searchParams.set("api_key", CONSTANTS.tmdbApiKey);
  return fullUrl;
}

async function getConfig() {
  const configUrl = getTmdbUrl("/3/configuration");
  const config = await (await fetch(configUrl)).json();
  // const config = {
  //   images: {
  //     base_url: "http://image.tmdb.org/t/p/",
  //     secure_base_url: "https://image.tmdb.org/t/p/",
  //     backdrop_sizes: ["w300", "w780", "w1280", "original"],
  //     logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  //     poster_sizes: [
  //       "w92",
  //       "w154",
  //       "w185",
  //       "w342",
  //       "w500",
  //       "w780",
  //       "original",
  //     ],
  //     profile_sizes: ["w45", "w185", "h632", "original"],
  //     still_sizes: ["w92", "w185", "w300", "original"],
  //   },
  // };
  return config;
}

let imageBaseUrl;
async function getImageBaseUrl() {
  return imageBaseUrl ?? (await getConfig()).images.secure_base_url;
}
/**
 * Get lists of posts from API
 * @returns {Promise<{userId:number, id:number, title:string, overview:string, poster_path:string}[]>}
 */
export async function getTrending() {
  const trendingUrl = getTmdbUrl("/3/trending/movie/day");
  const trending = await (await fetch(trendingUrl)).json();
  const imageBaseUrl = await getImageBaseUrl();

  const mappedTrending = trending.results
    .slice(0, CONSTANTS.movieListLimit)
    .map(({ id, title, overview, poster_path }) => ({
      id,
      title,
      overview,
      poster_path: poster_path && `${imageBaseUrl}w185${poster_path}`,
    }));

  return mappedTrending;
}

export async function getMovieDetail(movieId) {
  const imageBaseUrl = await getImageBaseUrl();
  const url = getTmdbUrl(`/3/movie/${movieId}`);
  const response = await fetch(url);
  const movie = await response.json();
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: `${imageBaseUrl}w500${movie.poster_path}`,
  };
}

export async function searchMovie(query) {
  const imageBaseUrl = await getImageBaseUrl();
  const url = getTmdbUrl(`/3/search/movie?query=${query}`);
  const response = await fetch(url);
  const searchResult = await response.json();

  return searchResult.results
    .slice(0, CONSTANTS.movieListLimit)
    .map(({ id, title, overview, poster_path }) => ({
      id,
      title,
      overview,
      poster_path: poster_path &&  `${imageBaseUrl}w185${poster_path}`,
    }));
}
