import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  console.log(axios);
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://images.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl);

        setMovies(response.data.results);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    heigh: "390",
    width: "100%",
    playerVars: {
      //
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.source)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2> {title}</h2>
      <div className="row-posters">
        {movies.map((item) => {
          return (
            <img
              onClick={() => handleClick(item)}
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              key={item.id}
              src={`${base_url}${
                isLargeRow ? item.poster_path : item.backdrop_path
              }`}
              alt={item.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
