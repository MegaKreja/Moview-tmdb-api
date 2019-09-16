import React, { Component } from 'react';
import './FavoriteMovies.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import axios from 'axios';

const key = '18195450fabc62a70a30dbc0d43118e1';

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
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='favoriteMovies'>
        <Header />
        <Search />
        {this.state.favoriteMovies ? <h1>Hello</h1> : <Loader />}
      </div>
    );
  }
}

export default FavoriteMovies;
