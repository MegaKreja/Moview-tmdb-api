import React from "react";
import "../styles/NewMovies.css";

const newMovies = (props) => {
  const newMovies = props.newMovies.map((movie, i) => {
    let link = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    return (
      <div className="movie" key={i}>
        <img src={link} alt="movie poster"/>
      </div>
    );
  });

  return (
    <div className="movies">
      {newMovies}
    </div>
  );
}

export default newMovies;