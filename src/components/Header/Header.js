import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Dropdown, Menu } from 'semantic-ui-react';
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
          className='tmdbLink'
          href='https://www.themoviedb.org/?language=en'
          rel='noopener noreferrer'
          target='_blank'
        >
          <span className='tmdbLink'>TMDB</span>
        </a>
      </p>
      <Menu vertical className='menu'>
        <Dropdown item text='Logged in as Guest'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to='/login'>Login</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/register'>Register</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};

export default header;
