import React from "react";
import "../styles/MovieInfo.css";
import Star from "../styles/images/star.png";

const MovieInfo = (props) => {
  console.log(props);
  let imageLink = "https://image.tmdb.org/t/p/w300" + props.movie.poster_path;
  return (
    <div className="movieInfo">
      <div className="top">
        <div className="left">
          <div className="poster">
            <img src={imageLink} alt="movie poster"/>
          </div>
          <div className="rating">
            <h2><img src={Star} alt="rating icon"/> {props.movie.vote_average}/10</h2>
          </div>
        </div>
        
        <div className="right">
          <div className="description">
            <h1>{props.movie.title} ({props.movie.release_date.slice(0, 4)})</h1>
            <h3>Directed By {props.movie.credits.crew[0].name}</h3>
          </div>
        </div>
      </div>
      
      <div className="cast">
        
      </div>      
    </div>
  );
}

export default MovieInfo;