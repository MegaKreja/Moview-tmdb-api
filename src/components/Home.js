import React, { Component } from 'react';
import '../styles/Home.css';
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import NewMovies from "./NewMovies";
import axios from "axios";

class Home extends Component {
  
  state = {
    newMovies: [],
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
  
  componentDidMount() {
    const key = "18195450fabc62a70a30dbc0d43118e1";
    axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=" + key)
      .then(res => {
        console.log(res.data);
        const newMovies = res.data.results;
        this.setState({newMovies: newMovies})
      })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="home">
        <Header />
        <Search searchMovie={this.searchMovie}/>
        {this.state.search.length > 0 && <SearchResults searchResults={this.state.searchResults} />}
        <h2>New Movie Releases for {(new Date().getDate())}.{(new Date().getMonth())}.{(new Date().getFullYear())}</h2>
        <NewMovies newMovies={this.state.newMovies}/>
      </div>
    );
  }
}

export default Home;