import React from 'react';
import { Link } from 'react-router-dom';
import './ActorInfo.css';
import Placeholder from '../../styles/images/placeholder.png';
import MoviePlaceholder from '../../styles/images/moviePlaceholder.png';

const ActorInfo = props => {
  console.log(props.actor);
  let profileImg = 'https://image.tmdb.org/t/p/w300' + props.actor.profile_path;

  const shortenFilmography = props.actor.movie_credits.cast.slice(0, 10);
  const filmography = shortenFilmography.map((movie, i) => {
    let movieImg = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    let link = '/movie/' + movie.id;
    console.log(movie);
    return (
      <Link to={link} key={i}>
        <div className='actorMovie'>
          <img
            src={movie.poster_path !== null ? movieImg : MoviePlaceholder}
            alt='movie img'
          />
          <h3>
            {movie.title} (
            {movie.release_date ? movie.release_date.slice(0, 4) : 'TBD'}){' '}
            {movie.character ? 'as ' + movie.character : ''}
          </h3>
        </div>
      </Link>
    );
  });

  return (
    <div className='actorInfo'>
      <div className='profile'>
        <img
          src={props.actor.profile_path !== null ? profileImg : Placeholder}
          alt='actor profile'
        />
      </div>

      <div className='biography'>
        <h1 className='name'>{props.actor.name}</h1>
        <p>{props.actor.biography}</p>
        <h1>Filmography</h1>
      </div>

      <div className='filmography'>{filmography}</div>
    </div>
  );
};

export default ActorInfo;
