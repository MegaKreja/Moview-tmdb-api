import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Icon from "../styles/images/film-icon.png";

const header = (props) => {
  return (
    <div className="header">
      <img src={Icon} alt="icon images"/>
      <br/>
      <Link to="/">
        <h1>MoView</h1>
      </Link>
      <p className="info">Provided by <span className="tmdbLink">TMDB</span></p>
    </div>
  );
}

export default header;