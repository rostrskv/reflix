import { formatCurrency } from "../utils";
import { useEffect, useState } from "react";
import { getTrending, searchMovie } from "../services/movies";
import { CONSTANTS } from "../constants";
import { MovieList } from "./MovieList";
import Modal from "./Modal";

/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog({ usersRented, setUsersRented, userId }) {
  const [trending, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    gifQuery: "",
  });

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
      setModal({
        visible: true,
        message: "Not enough money to rent the movie",
      });
      return;
    }
    if (usersRented[0].rented.length >= CONSTANTS.movieListLimit) {
      setModal({
        visible: true,
        message: `Cannot rent more than ${CONSTANTS.movieListLimit} movies`,
      });
      return;
    }
    if (
      !isRented(movie) &&
      newBudget >= 0 &&
      usersRented[0].rented.length < CONSTANTS.movieListLimit
    ) {
      setRented([...getRented().rented, movie], newBudget);
      setModal({
        visible: true,
        message: `Rented "${movie.title}" Sucessfully!`,
        gifQuery: `movie ${movie.title}`,
      });
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
  function closeModalHandler() {
    setModal({ visible: false });
  }

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      getTrending().then(setTrending);
    } else {
      searchMovie(searchQuery).then(setTrending);
    }
  }, [searchQuery]);

  return (
    <div className="catalog">
      {modal.visible && (
        <Modal
          message={modal.message}
          gifQuery={modal.gifQuery}
          closeModal={closeModalHandler}
        />
      )}
      <div className="top-bar">
        <input
          placeholder="Search"
          value={searchQuery}
          onChange={searchHandler}
        />
        <div>Budget: {formatCurrency(getRented().budget)}</div>
      </div>
      {getRented().rented.length > 0 && <h2>Rented:</h2>}
      <MovieList
        movies={getRented().rented}
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
