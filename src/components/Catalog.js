import { formatCurrency } from "../utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrending } from "../services/movies";
import { CONSTANTS } from "../constants";
import { MovieList } from "./MovieList";

/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog() {
  // TODO: display all the rented Movies. (up to 10 movies)
  const { userId } = useLocation().state ?? 0;

  const [trending, setTrending] = useState([]);
  const [rented, setRented] = useState([]);
  const [budget, setBudget] = useState(CONSTANTS.startBudget);

  const isRented = (movie) => rented.some((r) => r.id === movie.id);

  function rentHandler(movieId) {
    const movie = trending.find((m) => m.id === movieId);
    const newBudget = budget - CONSTANTS.rentingPrice;
    if (
      !isRented(movie) &&
      newBudget >= 0 &&
      rented.length < CONSTANTS.movieListLimit
    ) {
      setRented([...rented, movie]);
      setBudget(newBudget);
    }
  }

  function unRentHandler(movieId) {
    setRented(rented.filter((r) => r.id !== movieId));
    setBudget(budget + CONSTANTS.rentingPrice);
  }

  useEffect(() => {
    getTrending().then(setTrending);
  }, []);

  return (
    <div className="catalog">
      <input placeholder="Search"></input>
      <div>Budget: {formatCurrency(budget)}</div>
      {rented.length > 0 && <h2>Rented:</h2>}
      <MovieList
        movies={rented}
        isRented={isRented}
        rentHandler={rentHandler}
        unRentHandler={unRentHandler}
      />
      <h2>Catalog:</h2>
      <MovieList
        movies={trending}
        isRented={isRented}
        rentHandler={rentHandler}
        unRentHandler={unRentHandler}
      />
    </div>
  );
}

