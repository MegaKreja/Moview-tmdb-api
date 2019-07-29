import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Icon from '../../styles/images/film-icon.png';

const header = props => {
  return (
    <div className='header'>
      <img src={Icon} alt='icon images' />
      <br />
      <Link to='/'>
        <h1>MoView</h1>
      </Link>
      <p className='info'>
        Provided by{' '}
        <a
          href='https://www.themoviedb.org/?language=en'
          rel='noopener noreferrer'
          target='_blank'
        >
          <span className='tmdbLink'>TMDB</span>
        </a>
      </p>
    </div>
  );
};

export default header;
