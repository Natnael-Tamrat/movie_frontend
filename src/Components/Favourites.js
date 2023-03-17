import React, { useState, useEffect } from "react";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Favourites.css";
export default function Favourites() {
  const [fetchedData, setFetchedData] = useState([]);
  const [toggleNotice, setToggleNotice] = useState(false);

  const handleClick = () => {
    setToggleNotice(true);
  };
  const getFavsFromDb = async () => {
    let favourite_movies = [];
    const fetchMethods = {
      method: "POST",
      body: JSON.stringify({ email: localStorage.getItem("user") }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch("http://170.187.188.89/favourites", fetchMethods);
    const result = await data.json();
    if (result.favourite_movies != null) {
      favourite_movies = result.favourite_movies.split(",");
      return favourite_movies;
    } else {
      return null;
    }
  };
  const addDataToState = async () => {
    let arr = [];
    arr = await getFavsFromDb();
    let favsArray = [];
    if (arr == null) {
      return favsArray;
    } else {
      for (let i = 0; i < arr.length; i++) {
        let result = await fetch(
          `https://www.omdbapi.com/?i=${arr[i]}&apikey=c85c8031`
        );
        let temp = await result.json();
        favsArray.push(temp);
      }
      return favsArray;
    }
  };
  useEffect(() => {
    addDataToState().then((values) => setFetchedData(values));
  }, [toggleNotice]);
  useEffect(() => {
    setTimeout(() => {
      setToggleNotice(false);
    }, 1000);
  }, [toggleNotice]);

  console.log(fetchedData);
  return (
    <div className="container-fluid parent">
      <div className="row">
        {toggleNotice ? (
          <div class="alert alert-success msg" role="alert">
            <FontAwesomeIcon icon={faCircleInfo} />
            Movie removed from Favourites!
          </div>
        ) : null}
        {fetchedData.map((movie) => {
          return (
            <div className="movie d-flex justify-content-start m-2 image-container">
              <img
                className="poster"
                src={`${movie.Poster}`}
                alt={movie.Title}
              ></img>
              <div className="overlay d-flex align-items-center justify-content-center">
                <p className="title">{movie.Title}</p>
                <div
                  className="fav"
                  onClick={async () => {
                    const fetchMethods = {
                      method: "DELETE",
                      body: JSON.stringify({
                        user: { email: localStorage.getItem("user") },
                        movie: movie.imdbID,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    };
                    const result = await fetch(
                      "http://170.187.188.89/deleteMovie",
                      fetchMethods
                    );
                    setToggleNotice(true);
                  }}
                >
                  <h6>Remove Movie</h6>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
