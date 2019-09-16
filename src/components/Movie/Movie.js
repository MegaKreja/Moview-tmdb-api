import React, { Component } from 'react';
import './Movie.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MovieInfo from '../MovieInfo/MovieInfo';
import Loader from '../Loader/Loader';
import axios from 'axios';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Movie extends Component {
  state = {
    movie: {},
    user: {},
    favorite: false,
    watchlist: false,
    rating: 0
  };

  // getUser = user => {
  //   this.setState({ user }, () => {
  //     const isFavorite = this.state.user.favoriteMovies.find(
  //       movie => movie.tmdbId === this.state.movie.id
  //     );
  //     const inWatchlist = this.state.user.watchlistMovies.find(
  //       movie => movie.tmdbId === this.state.movie.id
  //     );
  //     console.log(isFavorite, inWatchlist);
  //     this.setState({
  //       favorite: isFavorite,
  //       watchlist: inWatchlist
  //     });
  //   });
  // };

  isUserLoggedIn = jwt => {
    axios
      .get('http://localhost:8000/auth/get-user', {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        if (!res.data.expired) {
          const isFavorite = res.data.favoriteMovies.tmdbId.find(
            movie => movie === this.state.movie.id
          );
          const inWatchlist = res.data.watchlistMovies.tmdbId.find(
            movie => movie === this.state.movie.id
          );
          console.log(isFavorite, inWatchlist);
          this.setState({
            user: res.data,
            favorite: isFavorite,
            watchlist: inWatchlist
          });
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };

  getMovie = () => {
    const id = window.location.pathname.substring(7);
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '?api_key=' +
          key +
          '&append_to_response=credits,videos,similar'
      )
      .then(res => {
        const movie = res.data;
        this.setState({ movie });
      });
  };

  changeToFavorite = () => {
    const { movie, user } = this.state;
    this.setState(
      prevState => ({ favorite: !prevState.favorite }),
      () => {
        axios
          .post('http://localhost:8000/lists/favorite', {
            movie,
            user,
            favorite: this.state.favorite
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err));
      }
    );
  };

  putToWatchlist = () => {
    const { movie, user } = this.state;
    this.setState(
      prevState => ({ watchlist: !prevState.watchlist }),
      () => {
        axios
          .post('http://localhost:8000/lists/watchlist', {
            movie,
            user,
            watchlist: this.state.watchlist
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err));
      }
    );
  };

  componentDidMount() {
    this.getMovie();
    const jwt = localStorage.getItem('token');
    if (jwt) {
      this.isUserLoggedIn(jwt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie !== this.state.movie) {
      this.getMovie();
      const jwt = localStorage.getItem('token');
      if (jwt) {
        this.isUserLoggedIn(jwt);
      }
    }
  }

  componentWillUnmount() {
    this.setState({ movie: {}, user: {}, favorite: false, watchlist: false });
    console.log('unmount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  pageChange = () => {
    this.setState({ movie: {}, user: {}, favorite: false, watchlist: false });
  };

  render() {
    return (
      <div className='moviePage'>
        <Header />
        <Search />
        {Object.keys(this.state.movie).length ? (
          <MovieInfo
            pageChange={this.pageChange}
            movie={this.state.movie}
            user={this.state.user}
            favorite={this.state.favorite}
            watchlist={this.state.watchlist}
            changeToFavorite={this.changeToFavorite}
            putToWatchlist={this.putToWatchlist}
          />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Movie;
