import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteMovies.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import axios from 'axios';

class FavoriteMovies extends Component {
  state = {
    favoriteMovies: []
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    axios
      .get(
        `http://localhost:8000/lists/${this.props.match.params.username}/favorite`
      )
      .then(res => {
        const favoriteMovies = res.data.favoriteMovies.list.slice();
        this.setState({ favoriteMovies });
      })
      .catch(err => console.log(err));
  };

  render() {
    const username = this.props.match.params.username;
    const movies = this.state.favoriteMovies.map((movie, i) => {
      let imageLink = 'https://image.tmdb.org/t/p/w300' + movie.posterPath;
      let link = '/movie/' + movie.tmdbId;
      return (
        <Link key={i} to={link}>
          <div className='favoriteMovie'>
            <img src={imageLink} alt='movie poster' />
          </div>
        </Link>
      );
    });
    return (
      <div className='favoriteMovies'>
        <Header />
        <Search />
        <h2>Favorite movies by {username}</h2>
        {this.state.favoriteMovies.length !== 0 ? movies : <Loader />}
      </div>
    );
  }
}

export default FavoriteMovies;
