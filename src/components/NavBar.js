import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <div className="nav-links">
        <Link to="/">Home</Link> <Link to="/catalog">Catalog</Link>
      </div>
      <div className="logo">REFLIX</div>
    </>
  );
}
