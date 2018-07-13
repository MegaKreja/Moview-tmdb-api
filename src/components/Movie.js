import React, { Component } from 'react';
import '../styles/Movie.css';
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import MovieInfo from "./MovieInfo";
import axios from "axios";

class Movie extends Component {
  
  state = {
    id: this.props.match.params.id,
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

  getMovie = (movieId) => {
    const key = "18195450fabc62a70a30dbc0d43118e1";
    const id = movieId;
    // console.log(this.props.match.params.id);
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits")
      .then(res => {
        const movie = res.data;
        this.setState({movie: movie})
      });
  }

  componentDidMount() {
    const key = "18195450fabc62a70a30dbc0d43118e1";
    const id = this.props.match.params.id;
    // console.log(this.props.match.params.id);
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits")
      .then(res => {
        const movie = res.data;
        this.setState({movie: movie})
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({searchResults: []})
    this.setState({id: nextProps.match.params.id});
    this.getMovie(nextProps.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="moviePage">
        <Header />
        <Search searchMovie={this.searchMovie}/>
        {this.state.search.length > 0 && <SearchResults searchResults={this.state.searchResults} />}
        <MovieInfo movie={this.state.movie}/>
      </div>
    );
  }
}

export default Movie;