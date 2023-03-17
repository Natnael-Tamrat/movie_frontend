import React, { useContext, useEffect, useState } from "react";
import { faCircleInfo, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { context } from "../Context/QueryProvider";
import "../styles/Movies.css";
export default function Movies() {
  const [fetchedData, setFetchedData] = useState([]);
  const [toggleNotice, setToggleNotice] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  const queryContext = useContext(context);

  const fetchData = async () => {
    const response = await fetch(
      "http://www.omdbapi.com/?apikey=c85c8031&s=batman&type=movie&page=1"
    );
    const data = await response.json();
    setFetchedData(data.Search);
  };
  const fetchDataWithQuery = async () => {
    if (queryContext.query !== "") {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=c85c8031&s=${queryContext.query}&type=movie&page=1`
      );
      const data = await response.json();
      console.log(data);
      setFetchedData(data.Search);
      if (data.Response == "False") setErrorFound(true);
    } else {
      fetchData();
    }
  };
  const checkRecord = async (movieId) => {
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
      console.log("found", favourite_movies.includes(movieId));
      return favourite_movies.includes(movieId);
    } else {
      return false;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);
  useEffect(() => {
    setTimeout(() => {
      setToggleNotice(false);
    }, 1000);
  }, [toggleNotice]);
  useEffect(() => {
    fetchDataWithQuery();
  }, [queryContext.isQuerySubmitted]);

  if (errorFound) {
    return <h1>Query too broad! Refresh the page</h1>;
  } else
    return (
      <div className="container-fluid parent">
        <div className="row">
          {toggleNotice ? (
            <div class="alert alert-success msg" role="alert">
              <FontAwesomeIcon icon={faCircleInfo} />
              Movie Added to your Favourites!
            </div>
          ) : null}
          {fetchedData.map((movie) => {
            return (
              <div className="movie d-flex justify-content-start m-2 image-container">
                <img
                  className="poster"
                  src={movie.Poster}
                  alt={movie.Title}
                ></img>
                <div className="overlay d-flex align-items-center justify-content-center">
                  <p className="title">{movie.Title}</p>
                  <div
                    className="fav"
                    id={movie.imdbID}
                    onClick={async () => {
                      const flag = await checkRecord(movie.imdbID);
                      if (!flag) {
                        const fetchMethods = {
                          method: "POST",
                          body: JSON.stringify({
                            user: { email: localStorage.getItem("user") },
                            movie: movie.imdbID,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        };
                        const result = await fetch(
                          "http://170.187.188.89/insertMovie",
                          fetchMethods
                        );
                        console.log(result);
                        setToggleNotice(true);
                      } else {
                        alert("The movie is already in your favourites");
                      }
                    }}
                  >
                    <h6>Add to favourites</h6>
                    <FontAwesomeIcon icon={faHeart} color="red" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}
