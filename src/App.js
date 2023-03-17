import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favourites from "./Components/Favourites";
import Login from "./Components/Login";
import Movies from "./Components/Movies";
import NavBar from "./Components/NavBar";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              localStorage.getItem("isAuthenticated") ? (
                <>
                  <NavBar />
                  <Movies />
                </>
              ) : (
                <Login />
              )
            }
          ></Route>

          <Route
            exact
            path="/movies"
            element={
              localStorage.getItem("isAuthenticated") ? (
                <>
                  <NavBar />
                  <Movies />
                </>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/favourites"
            element={
              localStorage.getItem("isAuthenticated") ? (
                <>
                  <NavBar />
                  <Favourites />
                </>
              ) : (
                <Login />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
