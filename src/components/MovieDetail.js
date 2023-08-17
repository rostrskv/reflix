import { useParams } from 'react-router-dom';
export default function MovieDetail() {
  const {movieId} = useParams();
  return (
    <div className="movie-detail">
      <img src="/logo192.png" alt={`"${movieId}" Movie poster`} />
      <div>"{movieId}" Movie description</div>
    </div>
  );
}
