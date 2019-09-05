import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import { Dropdown } from 'semantic-ui-react';
import Icon from '../../styles/images/film-icon.png';
import Loader from '../Loader/Loader';

class Header extends Component {
  state = {
    user: {},
    username: ''
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      this.isUserLoggedIn(jwt);
    } else {
      this.setState({ username: 'Guest' });
    }
  }

  isUserLoggedIn = jwt => {
    axios
      .get('http://localhost:8000/auth/get-user', {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        if (!res.data.expired) {
          this.setState({ user: res.data }, () => {
            const { username } = this.state.user;
            this.setState({ username });
          });
        } else {
          this.setState({ username: 'Guest' });
        }
      })
      .catch(err => console.log(err));
  };

  signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    this.setState({ user: {}, username: 'Guest' });
  };

  render() {
    const { image } = this.state.user;
    const username = this.state.username.slice();
    const imageLink = process.env.PUBLIC_URL + '/' + this.state.user.image;

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
        <Dropdown.Item as={Link} to={`/watchlist/${username}`}>
          Watchlist
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/favorite/${username}`}>
          Favorite Movies
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/edit/${username}`}>
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={this.signOut} as={Link} to='/'>
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    );

    return (
      <div className='header'>
        <div className='logo'>
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
        </div>

        <div className='userInfo'>
          {image && <img src={imageLink} alt='profile pic' />}
          <Dropdown item text={`${username}`}>
            {username !== 'Guest' ? loggedInMenu : loggedOutMenu}
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Header;
