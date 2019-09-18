import React, { Fragment, Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';
import './Search.css';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Search extends Component {
  state = {
    searchTerm: '',
    searchResults: []
  };

  onChangeSearch = e => {
    this.searchMovie(e.target.value);
  };

  onPageChange = () => {
    this.setState({ searchTerm: '', searchResults: [] });
  };

  searchMovie = movieName => {
    this.setState({ searchTerm: movieName }, () => {
      if (movieName.length > 0) {
        axios
          .get(
            'https://api.themoviedb.org/3/search/movie?api_key=' +
              key +
              '&query=' +
              movieName
          )
          .then(res => {
            console.log(res.data.results.slice(0, 5));
            const searchResults = res.data.results.slice(0, 5);
            console.log(searchResults);
            this.setState({ searchResults });
          });
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div className='searchInput'>
          <input
            type='text'
            placeholder=' Search a movie'
            onChange={this.onChangeSearch}
            value={this.state.searchTerm}
          />
        </div>
        {this.state.searchTerm.length > 0 && (
          <SearchResults
            changePage={this.onPageChange}
            searchResults={this.state.searchResults}
          />
        )}
      </Fragment>
    );
  }
}

export default Search;
