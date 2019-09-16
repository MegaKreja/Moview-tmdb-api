import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = props => {
  const results = props.searchResults.map((movie, i) => {
    let imageLink = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    let link = '/movie/' + movie.id;
    return (
      <Link onClick={props.changePage} key={i} to={link}>
        <li>
          <img src={imageLink} alt='poster img' />
          <h3>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h3>
        </li>
      </Link>
    );
  });
  return (
    <div className='results'>
      <ul>{results}</ul>
    </div>
  );
};

export default SearchResults;
