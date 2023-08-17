import { Link } from "react-router-dom";
/**
 * Landing page component
 * @returns
 */
export default function Landing() {
  // TODO: The Landing component should hold all the data about the users
  // (their name and background color) in its own state.
  // TODO:  Choosing one of these Users in the Landing Page will send you to the Catalog in which you will be able to see All the Rented Movies by the User and The Trending Movies at the moment (Show only up to 10 movies)
  // At first, you should only render the users in separate boxes. Clicking on any box should simply re-route the page to /catalog - no need to consider which user is currently active.
  
  const users = [
    { name: "Mona", color: "#3598d9" },
    { name: "Jasmyne", color: "#e64b3c" },
    { name: "Aura", color: "#2acb72" },
    { name: "Tina", color: "#f0c31d" },
  ];

  return (
    <div className="landing">
      <h1>Who's watching?</h1>
      <div className="users">
        {users.map(({ name, color }, index) => (
          <Link key={index} to="/catalog">
            <button style={{ backgroundColor: color }}>{name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
