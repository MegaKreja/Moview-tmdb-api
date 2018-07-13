import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewMovies.css";

const newMovies = (props) => {
  const newMovies = props.newMovies.map((movie, i) => {
    let imageLink = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    let link = "/movie/" + movie.id;
    return (
      <Link to={link} key={i}>
        <div className="movie">
          <img src={imageLink} alt="movie poster"/>
        </div>
      </Link>
    );
  });

  return (
    <div className="movies">
      {newMovies}
    </div>
  );
}

export default newMovies;