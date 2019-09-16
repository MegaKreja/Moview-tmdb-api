import React, { Component } from 'react';
import './Watchlist.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import axios from 'axios';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Watchlist extends Component {
  state = {
    watchlist: []
  };

  render() {
    return (
      <div className='watchlist'>
        <Header />
        <Search />
        {this.state.Watchlist ? <h1>Hello</h1> : <Loader />}
      </div>
    );
  }
}

export default Watchlist;
