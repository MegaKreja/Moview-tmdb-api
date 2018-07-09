import React from "react";
import "../styles/Header.css"
import Icon from "../styles/images/film-icon.png";

const header = (props) => {
  return (
    <div className="header">
      <img src={Icon} alt="icon images"/>
      <br/>
      <h1>MoView</h1>
      <p className="info">Provided by <span className="tmdbLink">TMDB API</span></p>
    </div>
  );
}

export default header;