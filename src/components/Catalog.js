import Movie from "./Movie";
/**
 * Landing page component.
 * Displaying movies (catalog & rented), search bar, and budget
 * @returns
 */
export default function Catalog() {
  // TODO: In this page you will fetch all the trending movies from the API and display them.
  // You will also display all the rented Movies. (up to 10 movies)
  const rentedMoviesIds = [2];
  const catalogMoviesIds = [2, 3, 4];
  const budget = 10;

  const budgetFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="catalog">
      <input placeholder="Search"></input>
      <div>Budget: {budgetFormat.format(budget)}</div>

      <h2>Rented:</h2>
      <div>
        {rentedMoviesIds.map((id) => (
          <Movie key={id} movieId={id} />
        ))}
      </div>

      <h2>Catalog:</h2>
      <div>
        {catalogMoviesIds.map((id) => (
          <Movie  key={id} movieId={id} />
        ))}
      </div>
    </div>
  );
}
