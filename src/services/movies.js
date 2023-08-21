import { CONSTANTS } from "../constants";

function getTmdbUrl(url) {
  const baseUrl = "https://api.themoviedb.org/";
  const fullUrl = new URL(url, baseUrl);
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
  const trendingUrl = getTmdbUrl("/3/trending/movie/day?language=en-US");
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
    .map(({ id, title, overview, poster_path, backdrop_path }) => ({
      id,
      title,
      overview,
      poster_path: `${imageBaseUrl}w185/${poster_path}`,
    }));

  return mappedTrending;
}
