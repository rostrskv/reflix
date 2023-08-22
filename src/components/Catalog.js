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
  const [budget, setBudget] = useState(CONSTANTS.startBudget);
  const [searchQuery, setSearchQuery] = useState("");

  function getRented() {
    return usersRented[userId].rented;
  }
  
  function setRented(rented) {
    setUsersRented({...usersRented, [userId]:{
      ...{...usersRented[userId], rented:rented}
    }});
  }
  
  const isRented = (movie) => getRented().some((r) => r.id === movie.id);

  function rentHandler(movieId) {
    const movie = trending.find((m) => m.id === movieId);
    const newBudget = budget - CONSTANTS.rentingPrice;
    // TODO: show "non enough $$$ to rent"/"too many moves rented"
    if (
      !isRented(movie) &&
      newBudget >= 0 &&
      usersRented[0].rented.length < CONSTANTS.movieListLimit
    ) {
      setRented([...getRented(), movie]);
      setBudget(newBudget);
    }
  }
  function unRentHandler(movieId) {
    setRented(getRented().filter((r) => r.id !== movieId));
    setBudget(budget + CONSTANTS.rentingPrice);
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
      <div>Budget: {formatCurrency(budget)}</div>
      {getRented().length > 0 && <h2>Rented:</h2>}
      <MovieList
        userId={userId}
        movies={getRented()}
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
