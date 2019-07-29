import React, { Component } from 'react';
import './Home.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import NewMovies from '../NewMovies/NewMovies';
import Loader from '../Loader/Loader';
import axios from 'axios';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Home extends Component {
  state = {
    newMovies: []
  };

  componentDidMount() {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + key)
      .then(res => {
        const newMovies = res.data.results;
        this.setState({ newMovies });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className='home'>
        <Header />
        <Search />
        <h2>
          New Movie Releases for {new Date().getDate()}.{new Date().getMonth()}.
          {new Date().getFullYear()}
        </h2>
        {this.state.newMovies ? (
          <NewMovies newMovies={this.state.newMovies} />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Home;
