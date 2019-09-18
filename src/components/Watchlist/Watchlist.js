import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Watchlist.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import axios from 'axios';

class Watchlist extends Component {
  state = {
    watchlist: []
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    axios
      .get(
        `http://localhost:8000/lists/${this.props.match.params.username}/watchlist`
      )
      .then(res => {
        const watchlist = res.data.watchlistMovies.list.slice();
        this.setState({ watchlist });
      })
      .catch(err => console.log(err));
  };

  render() {
    const username = this.props.match.params.username;
    const movies = this.state.watchlist.map((movie, i) => {
      let imageLink = 'https://image.tmdb.org/t/p/w300' + movie.posterPath;
      let link = '/movie/' + movie.tmdbId;
      return (
        <Link key={i} to={link}>
          <div className='watchlistMovie'>
            <img src={imageLink} alt='movie poster' />
          </div>
        </Link>
      );
    });
    return (
      <div className='watchlist'>
        <Header />
        <Search />
        <h2>Watchlist by {username}</h2>
        {this.state.watchlist.length !== 0 ? movies : <Loader />}
      </div>
    );
  }
}

export default Watchlist;
