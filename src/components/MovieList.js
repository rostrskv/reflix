import Movie from "./Movie";

export function MovieList({ movies, isRented, rentHandler, unRentHandler }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          isRented={isRented(movie)}
          rentHandler={() => rentHandler(movie.id)}
          unRentHandler={() => unRentHandler(movie.id)}
          {...movie} />
      ))}
    </div>
  );
}
