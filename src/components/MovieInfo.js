import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieInfo.css";
import Star from "../styles/images/star.png";
import Placeholder from "../styles/images/placeholder.png";
import MoviePlaceholder from "../styles/images/moviePlaceholder.png";

const MovieInfo = (props) => {
  console.log(props);
  let posterImg = "https://image.tmdb.org/t/p/w300" + props.movie.poster_path;

  const genres = props.movie.genres.map((genre, i) => {
    return (
      <h4 key={i}>{genre.name}</h4>
    );
  });

  let director = null;
  for (let i = 0; i < props.movie.credits.crew.length; i++) { 
    if (props.movie.credits.crew[i].job === "Director") { 
      director = props.movie.credits.crew[i].name;
      break;
    } 
  }

  let videoLink = "";
  for (let i = 0; i < props.movie.videos.results.length; i++) { 
    if (props.movie.videos.results[i].type === "Trailer") { 
      videoLink = "https://www.youtube.com/embed/" + props.movie.videos.results[i].key;
      break;
    } 
  }

  const shortenCast = props.movie.credits.cast.slice(0, 10);
  const cast = shortenCast.map((actor, i) => {
    let actorImg = "https://image.tmdb.org/t/p/w300" + actor.profile_path;
    let link = "/actor/" + actor.id;
    return (
      <Link to={link} key={i}>
        <div className="actor">
          <img src={actor.profile_path === null ? Placeholder : actorImg} alt="actor img"/>
          <p>{actor.name}</p>
        </div>
      </Link>
    );
  });

  const similarArr = props.movie.similar.results.slice(0, 10);
  const similarMovies = similarArr.map((movie, i) => {
    let movieImg = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    let link = "/movie/" + movie.id;
    return (
      <Link to={link} key={i}>
        <div className="similarMovie">
          <img src={movie.poster_path !== null ? movieImg : MoviePlaceholder} alt="movie img"/>
        </div>
      </Link>
    );
  });

  return (
    <div className="movieInfo">
      <div className="top">
        <div className="left">
          <div className="poster">
            <img src={props.movie.poster_path !== null ? posterImg : MoviePlaceholder} alt="movie poster"/>
          </div>
        </div>
        
        <div className="right">
          <div className="description">
            <h1>{props.movie.title} ({props.movie.release_date.slice(0, 4)})</h1>
            {props.movie.credits.crew.length !== 0 && <h3>Directed By {director}</h3>}
            <div className="genres">
              {genres}
            </div>
            <h4 className="runtime">{props.movie.runtime} minutes</h4>
            <div className="summary">
              <h3>{props.movie.overview}</h3>
            </div>
            <div className="rating">
              <h2><img src={Star} alt="rating icon"/> {props.movie.vote_average}/10</h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cast">
        <h1>Cast</h1>
        {cast}
      </div>

      {videoLink !== "" && 
      <div className="trailer">
        <h1>Trailer</h1>
        <iframe title="trailer" className="video" src={videoLink} allow="encrypted-media"></iframe>
      </div>}

      <div className="similar">
        <h1>Similar movies</h1>
        {similarMovies}
      </div>    
    </div>
  );
}

export default MovieInfo;