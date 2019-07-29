import React, { Component } from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import ActorInfo from '../ActorInfo/ActorInfo';
import Loader from '../Loader/Loader';
import axios from 'axios';
import './Actor.css';

const key = '18195450fabc62a70a30dbc0d43118e1';

class Actor extends Component {
  state = {
    actor: {}
  };

  getActor = () => {
    const id = window.location.pathname.substring(7);
    axios
      .get(
        'https://api.themoviedb.org/3/person/' +
          id +
          '?api_key=' +
          key +
          '&append_to_response=movie_credits'
      )
      .then(res => {
        const actor = res.data;
        this.setState({ actor });
      });
  };

  componentDidMount() {
    this.getActor();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actor !== this.state.actor) {
      this.getActor();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className='actorPage'>
        <Header />
        <Search />
        {Object.keys(this.state.actor).length ? (
          <ActorInfo actor={this.state.actor} />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Actor;
