import Movie from "./Movie";
import { formatCurrency } from "../utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrending } from "../services/movies";

/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog() {
  // TODO: display all the rented Movies. (up to 10 movies)
  const { userId } = useLocation().state;

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
          <Movie key={movie.id} isRented={false} {...movie} />
        ))}
      </div>
    </div>
  );
}
