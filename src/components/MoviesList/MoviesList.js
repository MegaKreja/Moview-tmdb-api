import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesList.css';

const MoviesList = props => {
  const moviesList = props.moviesList.map((movie, i) => {
    let imageLink = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    let link = '/movie/' + movie.id;
    return (
      <div className='movie' key={i}>
        <Link to={link}>
          <img src={imageLink} alt='movie poster' />
        </Link>
      </div>
    );
  });

  return <div className='movies'>{moviesList}</div>;
};

export default MoviesList;
