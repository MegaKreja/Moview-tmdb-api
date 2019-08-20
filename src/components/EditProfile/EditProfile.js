import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

class EditProfile extends Component {
  state = {
    username: '',
    email: '',
    image: '',
    errors: []
  };

  errorMessage = inputName => {
    const { errors } = this.state;
    const error = errors.find(err => err.param === inputName);
    if (error) {
      return <p>{error.msg}</p>;
    }
    return;
  };

  render() {
    return (
      <div className='edit'>
        <h2>Edit profile</h2>
        <label htmlFor='username'>Username</label>
        <input
          style={{
            border: this.errorMessage('username') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ username: e.target.value })}
          className='username'
          name='username'
          placeholder='johnsmith'
          type='text'
        />
        {this.state.errors.length > 0 && this.errorMessage('username')}
        <label htmlFor='email'>Email</label>
        <input
          style={{
            border: this.errorMessage('email') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ email: e.target.value })}
          className='email'
          name='email'
          placeholder='johnsmith@gmail.com'
          type='text'
        />
        {this.state.errors.length > 0 && this.errorMessage('email')}
        <input className='image' name='image' type='file' />
        <br />
        <button className='btnEdit'>Edit</button>
      </div>
    );
  }
}

export default EditProfile;
