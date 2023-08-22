import { useState } from "react";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../constants";
/**
 * Landing page component
 * @returns
 */
export default function Landing({ usersRented, setUsersRented }) {
  // TODO: The Landing component should hold all the data about the users
  // (their name and background color) in its own state.
  // TODO:  Choosing one of these Users in the Landing Page will send you to the Catalog in which you will be able to see All the Rented Movies by the User and The Trending Movies at the moment (Show only up to 10 movies)
  // At first, you should only render the users in separate boxes. Clicking on any box should simply re-route the page to /catalog - no need to consider which user is currently active.

  const [usersState] = useState(CONSTANTS.users);

  return (
    <div className="landing">
      <h1>Who's watching?</h1>
      <div className="usersState">
        {usersState.map((user) => (
          <Link key={user.id} to="/catalog" state={{ userId: user.id }}>
            <button style={{ backgroundColor: user.color }}>{user.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
