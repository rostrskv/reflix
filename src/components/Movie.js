import { Link } from "react-router-dom";
/**
 * Renders list of movies
 * @param {*} param0 
 * @returns 
 */
export default function Movie({
  userId,
  id,
  title,
  overview,
  poster_path,
  isRented,
  rentHandler,
  unRentHandler,
}) {
  return (
    <div className="movie">
      <Link to={`/movies/${id}`} state={{ userId }}>
        <img src={poster_path} alt={title} title={title} />
      </Link>
      {isRented ? (
        <button title="Return rented movie" onClick={unRentHandler}>-</button>
      ) : (
        <button title="Rent movie" onClick={rentHandler}>+</button>
      )}
    </div>
  );
}
