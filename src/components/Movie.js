import { Link } from "react-router-dom";
export default function Movie({ movieId, isRented }) {
  return (
    <div className="movie">
      <Link to={`/movies/${movieId}`}>
        <img src="/favicon.ico" alt={`"${movieId}" Movie poster`} />
      </Link>
      <button title="Rent movie">{isRented?"-":"+"}</button>
    </div>
  );
}
