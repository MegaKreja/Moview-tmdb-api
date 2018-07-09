import React from "react";
import "../styles/SearchResults.css";

const SearchResults = (props) => {
  const results = props.searchResults.map((movie, i) => {
    let link = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    return (
      <li key={i}>
        <img src={link} alt="poster img" />
        <h3>{movie.title} ({movie.release_date.slice(0, 4)})</h3>
      </li> 
    );
  });
  return (
    <div className="results">
      <ul>
        {results}
      </ul>
    </div>
  );
}

export default SearchResults;