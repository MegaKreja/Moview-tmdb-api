import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import { Dropdown, Menu } from 'semantic-ui-react';
import Icon from '../../styles/images/film-icon.png';

class Header extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      this.isUserLoggedIn(jwt);
    }
  }

  isUserLoggedIn = jwt => {
    axios
      .get('http://localhost:8000/auth/get-user', {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        if (!res.data.expired) {
          this.setState({ user: res.data });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { username } = this.state.user;
    const loggedOutMenu = (
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/login'>
          Login
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/register'>
          Register
        </Dropdown.Item>
      </Dropdown.Menu>
    );
    // set routes better in the future
    const loggedInMenu = (
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/watchlist'>
          Watchlist
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/ratings'>
          Ratings
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/edit-profile'>
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to='/'>
          Signout
        </Dropdown.Item>
      </Dropdown.Menu>
    );

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
          <Dropdown item text={`Logged in as ${username ? username : 'Guest'}`}>
            {username ? loggedInMenu : loggedOutMenu}
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

export default Header;
