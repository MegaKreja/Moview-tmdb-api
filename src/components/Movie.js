import React, { Component } from 'react';
import '../styles/Movie.css';
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import MovieInfo from "./MovieInfo";
import axios from "axios";

class Movie extends Component {
  
  state = {
    movie: {},
    search: "",
    searchResults: []
  }

  searchMovie = (movieName) => {
    this.setState({search: movieName});
    const key = "18195450fabc62a70a30dbc0d43118e1";
    if(movieName.length > 0) {
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + movieName)
      .then(res => {
        const searchResults = res.data.results.slice(0, 5);
        this.setState({searchResults: searchResults})
      })
    }
  }

  getMovie = () => {
    const key = "18195450fabc62a70a30dbc0d43118e1";
    const id = window.location.pathname.substring(7);
    console.log(this.props);
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits,videos,similar")
      .then(res => {
        const movie = res.data;
        this.setState({movie: movie})
      });
  }

  componentDidMount() {
    this.getMovie();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.movie !== this.state.movie) {
      this.setState({searchResults: []});
      this.setState({search: ""});
      this.getMovie();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="moviePage">
        <Header />
        <Search searchMovie={this.searchMovie} search={this.state.search}/>
        {this.state.search.length > 0 && <SearchResults searchResults={this.state.searchResults} />}
        {Object.keys(this.state.movie).length ? <MovieInfo movie={this.state.movie}/> : ""}
      </div>
    );
  }
}

export default Movie;