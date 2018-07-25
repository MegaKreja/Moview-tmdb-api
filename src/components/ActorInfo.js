import React from "react";
import { Link } from "react-router-dom";
import "../styles/ActorInfo.css";

const ActorInfo = (props) => {
  console.log(props);
  let profileImg = "https://image.tmdb.org/t/p/w300" + props.actor.profile_path;
  
  return (
    <div className="actorInfo">
      <div className="profile">
        <img src={profileImg} alt="actor profile"/>
      </div>

      <div className="biography">
        <h1>{props.actor.name}</h1>
        <p>{props.actor.biography}</p>
      </div>

      <div className="filmography">
        <h1>Filmography</h1>
      </div>

    </div>
  );
}

export default ActorInfo;