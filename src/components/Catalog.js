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
  const { userId } = useLocation().state ?? 0;

  const [trendingState, setTrendingState] = useState([]);

  const [rentedState, setRentedState] = useState([]);

  const isRented = (movie) => rentedState.some((r) => r.id === movie.id);

  function rentHandler(movieId) {
    const movie = trendingState.find((m) => m.id === movieId);
    if (!isRented(movie)) {
      setRentedState([...rentedState, movie]);
    }
  }

  function unRentHandler(movieId) {
    setRentedState(rentedState.filter((r) => r.id !== movieId));
  }

  useEffect(() => {
    getTrending().then(setTrendingState);
  }, []);

  const budget = 10;

  return (
    <div className="catalog">
      <input placeholder="Search"></input>
      <div>Budget: {formatCurrency(budget)}</div>

      <h2>Rented:</h2>
      <div>
      {rentedState.map((movie) => (
          <Movie
            key={movie.id}
            userId={userId}
            isRented={isRented(movie)}
            rentHandler={() => rentHandler(movie.id)}
            unRentHandler={() => unRentHandler(movie.id)}
            {...movie}
          />
        ))}
      </div>

      <h2>Catalog:</h2>
      <div>
        {trendingState.map((movie) => (
          <Movie
            key={movie.id}
            userId={userId}
            isRented={isRented(movie)}
            rentHandler={() => rentHandler(movie.id)}
            unRentHandler={() => unRentHandler(movie.id)}
            {...movie}
          />
        ))}
      </div>
    </div>
  );
}
