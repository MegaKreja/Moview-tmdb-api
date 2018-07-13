import React from "react";
import "../styles/MovieInfo.css";

const MovieInfo = (props) => {
  console.log(props);
  let imageLink = "https://image.tmdb.org/t/p/w300" + props.movie.poster_path;
  return (
    <div className="movieInfo">
      <div className="poster">
        <img src={imageLink} alt="movie poster"/>
      </div>
      <div className="description">
        
      </div>
      <div className="cast">
        
      </div>      
    </div>
  );
}

export default MovieInfo;