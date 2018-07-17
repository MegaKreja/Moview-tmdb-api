import React from "react";
import "../styles/MovieInfo.css";
import Star from "../styles/images/star.png";

const MovieInfo = (props) => {
  console.log(props);
  let imageLink = "https://image.tmdb.org/t/p/w300" + props.movie.poster_path;
  const genres = props.movie.genres.map((genre, i) => {
    return (
      <h4 key={i}>{genre.name}</h4>
    );
  });
  // popraviti rezisera jer izbacuje scenaristu sa map petljom
  return (
    <div className="movieInfo">
      <div className="top">
        <div className="left">
          <div className="poster">
            <img src={imageLink} alt="movie poster"/>
          </div>
          
        </div>
        
        <div className="right">
          <div className="description">
            <h1>{props.movie.title} ({props.movie.release_date.slice(0, 4)})</h1>
            {props.movie.credits.crew.length !== 0 && <h3>Directed By {props.movie.credits.crew[0].name}</h3>}
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
        
      </div>      
    </div>
  );
  // srediti error ako je bas nepoznat film za rezisera
}

export default MovieInfo;