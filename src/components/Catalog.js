import Movie from "./Movie";
import { formatCurrency } from "../utils";
import { useLocation } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { useEffect, useState } from "react";

/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog() {
  // TODO: In this page you will fetch all the trending movies from the API and display them.
  // You will also display all the rented Movies. (up to 10 movies)
  const { userId } = useLocation().state;

  async function getTrending() {
    function getTmdbUrl(url) {
      const baseUrl = "https://api.themoviedb.org/";
      const fullUrl = new URL(url, baseUrl);
      fullUrl.searchParams.set("api_key", CONSTANTS.tmdbApiKey);
      return fullUrl;
    }
    const configUrl = getTmdbUrl("/3/configuration");
    const config = await (await fetch(configUrl)).json();
    const trendingUrl = getTmdbUrl("/3/trending/movie/day?language=en-US");
    const trending = await (await fetch(trendingUrl)).json();
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
    // const trending = {
    //   trending: {
    //     results: [
    //       {
    //         backdrop_path: "/2D6ksPSChcRcZuvavrae9g4b8oh.jpg",
    //         id:    ,
    //         title: "The Monkey King",
    //         overview:
    //           "A stick-wielding monkey teams with a young girl on an epic quest for immortality, battling demons, dragons, gods — and his own ego — along the way.",
    //         poster_path: "/i6ye8ueFhVE5pXatgyRrZ83LBD8.jpg",
    //       },
    //     ],
    //   },
    // };

    const mappedTrending = trending.results
      .slice(0, 10)
      .map(({ id, title, overview, poster_path, backdrop_path }) => ({
        id,
        title,
        overview,
        poster_path: `${config.images.secure_base_url}w185/${poster_path}`,
      }));

    console.log({ mappedTrending, config, trending });
    return mappedTrending;
  }

  const [trendingState, setTrendingState] = useState([
    {
      id: NaN,
      title: "",
      overview: "",
      poster_path: "",
    },
  ]);

  useEffect(() => {
    getTrending().then(setTrendingState);
  }, []);

  const rentedMoviesIds = [2];
  const catalogMoviesIds = [2, 3, 4];
  const budget = 10;

  return (
    <div className="catalog">
      <input placeholder="Search"></input>
      <div>Budget: {formatCurrency(budget)}</div>

      <h2>Rented:</h2>
      <div>
        {rentedMoviesIds.map((id) => (
          <Movie key={id} movieId={id} isRented={true} />
        ))}
      </div>

      <h2>Catalog:</h2>
      <div>
        {trendingState.map((movie) => (
          <Movie key={movie.id} isRented={false} {... movie } />
        ))}
      </div>
    </div>
  );
}
