import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import MovieDetail from "./components/MovieDetail";
import { useState } from "react";
import { CONSTANTS } from "./constants";
function App() {
  const [usersRented, setUsersRented] = useState(
    Object.assign(
      {},
      ...CONSTANTS.users.map((u) => ({
        [u.id]: { id: u.id, budget: CONSTANTS.startBudget, rented: [] },
      }))
    )
  );
  const [userId, setUserId] = useState(CONSTANTS.users[0].id);

  return (
    <Router>
      <div className="App">
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                usersRented={usersRented}
                setUsersRented={setUsersRented}
                userId={userId}
                setUserId={setUserId}
              />
            }
          ></Route>
          <Route
            path="/catalog"
            element={
              <Catalog
                // TODO: move setting userRented from Catalog to Landing
                usersRented={usersRented}
                setUsersRented={setUsersRented}
                userId={userId}
                setUserId={setUserId}
              />
            }
          ></Route>
          <Route
            path="/movies/:movieId"
            element={<MovieDetail userId={userId} setUserId={setUserId} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
