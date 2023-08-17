import { Link } from "react-router-dom";
export default function Movie({ movieId }) {
  return (
    <Link to={`/movies/${movieId}`}>
      <div className="movie">
        <img src="/logo192.png" alt={`"${movieId}" Movie poster`} />
        <button title="Rent movie">+</button>
      </div>
    </Link>
  );
}
