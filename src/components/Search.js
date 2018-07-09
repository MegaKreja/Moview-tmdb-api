import React from "react";
import "../styles/Search.css";

const search = (props) => {
  return (
    <div className="input">
      <input type="text" placeholder=" Search a movie" onChange={(e) => props.searchMovie(e.target.value)}/>
    </div>
  );
}

export default search;