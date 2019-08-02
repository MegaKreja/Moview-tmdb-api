import React, { Component } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import SelectGenre from '../SelectGenre/SelectGenre';
import MoviesList from '../MoviesList/MoviesList';
import Loader from '../Loader/Loader';
import axios from 'axios';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Home extends Component {
  state = {
    moviesList: [],
    category: ''
  };

  componentDidMount() {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + key)
      .then(res => {
        const moviesList = res.data.results;
        this.setState({ moviesList });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  getCategory = (event, { value }) => {
    this.setState({ category: value }, () => {
      this.setState({ moviesList: [] });
      this.getNewList(this.state.category);
    });
  };

  getNewList = value => {
    const link =
      typeof value === 'string'
        ? 'https://api.themoviedb.org/3/movie/' + value + '?api_key=' + key
        : 'https://api.themoviedb.org/3/discover/movie?api_key=' +
          key +
          '&with_genres=' +
          value;
    axios.get(link).then(res => {
      const moviesList = res.data.results;
      this.setState({ moviesList });
    });
  };

  render() {
    return (
      <div className='home'>
        <Header />
        <Search />
        {/* <h2>
          New Movie Releases for {new Date().getDate()}.{new Date().getMonth()}.
          {new Date().getFullYear()}
        </h2> */}
        <SelectGenre getCategory={this.getCategory} />
        {Object.keys(this.state.moviesList).length ? (
          <MoviesList moviesList={this.state.moviesList} />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Home;
