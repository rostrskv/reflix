import { useParams } from "react-router-dom";
import { getMovieDetail } from "../services/movies";
import { useEffect, useState } from "react";
export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  useEffect(() => {
    getMovieDetail(movieId).then(setMovie);
    console.log(movie);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div className="movie-detail">
      <img src={movie?.poster_path} alt={`${movie?.title} poster`} />
      <h2>{movie?.title}</h2>
      <div>{movie?.overview}</div>
    </div>
  );
}
