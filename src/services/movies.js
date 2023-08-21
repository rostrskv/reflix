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
  // const trending = {
  //   trending: {
  //     results: [
  //       {
  //         backdrop_path: "/2D6ksPSChcRcZuvavrae9g4b8oh.jpg",
  //         id:    832502,
  //         title: "The Monkey King",
  //         overview: "A stick-wielding monkey teams with a young girl on an epic quest",
  //         poster_path: "/i6ye8ueFhVE5pXatgyRrZ83LBD8.jpg",
  //       },
  //     ],
  //   },
  // };

  const mappedTrending = trending.results
    .slice(0, CONSTANTS.movieListLimit)
    .map(({ id, title, overview, poster_path }) => ({
      id,
      title,
      overview,
      poster_path: `${imageBaseUrl}w185${poster_path}`,
    }));

  return mappedTrending;
}

// {
//   "adult": false,
//   "backdrop_path": "/2D6ksPSChcRcZuvavrae9g4b8oh.jpg",
//   "belongs_to_collection": null,
//   "budget": 0,
//   "genres": [
//   ],
//   "homepage": "https://www.netflix.com/title/80237245",
//   "id": 832502,
//   "imdb_id": "tt8637498",
//   "original_language": "en",
//   "original_title": "The Monkey King",
//   "overview": "A stick-wielding monkey teams with a young girl on an epic quest for immortality, battling demons, dragons, gods — and his own ego — along the way.",
//   "popularity": 72.796,
//   "poster_path": "/i6ye8ueFhVE5pXatgyRrZ83LBD8.jpg",
//   "production_companies": [
//       {
//           "id": 76266,
//           "logo_path": "/hcFz4LHfTkUkkDCtK7ozT2Hh4Ob.png",
//           "name": "Pearl Studio",
//           "origin_country": "CN"
//       }
//   ],
//   "production_countries": [
//       {
//           "iso_3166_1": "CN",
//           "name": "China"
//       }
//   ],
//   "release_date": "2023-08-11",
//   "revenue": 0,
//   "runtime": 92,
//   "spoken_languages": [
//   ],
//   "status": "Released",
//   "tagline": "The legend has arrived.",
//   "title": "The Monkey King",
//   "video": false,
//   "vote_average": 7.2,
//   "vote_count": 31
// }
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
      poster_path: `${imageBaseUrl}w185${poster_path}`,
    }));
}
