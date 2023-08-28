import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Movie.css'
/**
 * Renders list of movies
 * @param {*} param0
 * @returns
 */
export default function Movie({
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
      <Link to={`/movies/${id}`} >
        {poster_path ? (
          <img src={poster_path} alt={title} title={title} className="poster" />
        ) : (
          <span>{title}</span>
        )}
      </Link>
      {isRented ? (
        <button className="rent-button bi bi-dash-circle-fill"
          title="Return rented movie"
          onClick={unRentHandler}
        />
      ) : (
        <button className="rent-button bi bi-plus-circle-fill"
          title="Rent movie"
          onClick={rentHandler}
        />
      )}
    </div>
  );
}
