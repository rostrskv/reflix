import { Link } from "react-router-dom";
export default function Movie({ id, title, overview, poster_path, isRented }) {
  console.log({ id, title, overview, poster_path, isRented });
  return (
    <div className="movie">
      <Link to={`/movies/${id}`}>
        <img src={poster_path} alt={title} title={title} />
      </Link>
      <button title="Rent movie">{isRented ? "-" : "+"}</button>
    </div>
  );
}
