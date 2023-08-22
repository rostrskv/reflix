import { formatCurrency } from "../utils";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrending, searchMovie } from "../services/movies";
import { CONSTANTS } from "../constants";
import { MovieList } from "./MovieList";

/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog({
  usersRented,
  setUsersRented,
  userId,
  setUserId,
}) {
  setUserId(useLocation().state?.userId ?? 0);

  const [trending, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  function getRented() {
    return usersRented[userId];
  }

  function setRented(rented, budget) {
    setUsersRented({
      ...usersRented,
      [userId]: {
        ...{ ...usersRented[userId], rented, budget },
      },
    });
  }

  const isRented = (movie) => getRented().rented.some((r) => r.id === movie.id);

  function rentHandler(movieId) {
    const movie = trending.find((m) => m.id === movieId);
    const newBudget = getRented().budget - CONSTANTS.rentingPrice;
    if (newBudget < 0) {
      setMessage("Not enough money to rent the movie");
      return;
    }
    if (usersRented[0].rented.length < CONSTANTS.movieListLimit) {
      setMessage(`Cannot rent more than ${CONSTANTS.movieListLimit} movies`);
      return;
    }
    if (
      !isRented(movie) &&
      newBudget >= 0 &&
      usersRented[0].rented.length < CONSTANTS.movieListLimit
    ) {
      setRented([...getRented().rented, movie], newBudget);
    }
  }
  function unRentHandler(movieId) {
    setRented(
      getRented().rented.filter((r) => r.id !== movieId),
      getRented().budget + CONSTANTS.rentingPrice
    );
  }
  function searchHandler(event) {
    setSearchQuery(event.target.value);
  }

  // TODO: restrict times the api is called while searching

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      getTrending().then(setTrending);
    } else {
      searchMovie(searchQuery).then(setTrending);
    }
  }, [searchQuery]);

  return (
    <div className="catalog">
      <input
        placeholder="Search"
        value={searchQuery}
        onChange={searchHandler}
      ></input>
      <div>Budget: {formatCurrency(getRented().budget)}</div>
      {message.length > 0 && (
        <div className="message" onClick={() => setMessage("")}>
          {message}
        </div>
      )}
      {getRented().rented.length > 0 && <h2>Rented:</h2>}
      <MovieList
        userId={userId}
        movies={getRented().rented}
        isRented={isRented}
        rentHandler={rentHandler}
        unRentHandler={unRentHandler}
      />
      <h2>Catalog:</h2>
      <MovieList
        userId={userId}
        movies={trending}
        isRented={isRented}
        rentHandler={rentHandler}
        unRentHandler={unRentHandler}
      />
    </div>
  );
}
