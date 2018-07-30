import React, { Component } from "react";
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import ActorInfo from "./ActorInfo";
import Loader from "./Loader";
import axios from "axios";
import "../styles/Actor.css";

class Actor extends Component {
  
  state = {
    actor: {},
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

  getActor = () => {
    const key = "18195450fabc62a70a30dbc0d43118e1";
    const id = window.location.pathname.substring(7);
    axios.get("https://api.themoviedb.org/3/person/" + id + "?api_key=" + key + "&append_to_response=movie_credits")
      .then(res => {
        const actor = res.data;
        this.setState({actor: actor})
      });
  }

  componentDidMount() {
    this.getActor();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.actor !== this.state.actor) {
      this.setState({searchResults: []});
      this.setState({search: ""});
      this.getActor();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="actorPage">
        <Header />
        <Search searchMovie={this.searchMovie} search={this.state.search} />
        {this.state.search.length > 0 && <SearchResults searchResults={this.state.searchResults} />}
        {Object.keys(this.state.actor).length ? <ActorInfo actor={this.state.actor}/> : <Loader />}
      </div>
    );
  }
}

export default Actor;