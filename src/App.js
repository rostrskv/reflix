import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import MovieDetail from "./components/MovieDetail";
function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetail />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
