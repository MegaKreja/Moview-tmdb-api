import React, { Component } from 'react';
import axios from 'axios';
import './EditProfile.css';

class EditProfile extends Component {
  state = {
    username: '',
    email: '',
    image: '',
    errors: []
  };

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      this.getUser(jwt);
    }
  }

  getUser = jwt => {
    axios
      .get('http://localhost:8000/auth/get-user', {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        if (!res.data.expired) {
          const { username, email, image } = res.data;
          this.setState({ username, email, image });
        }
      })
      .catch(err => this.props.history.push('/'));
  };

  editProfile = e => {
    const jwt = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('image', this.state.image);
    const config = {
      onUploadProgress: progressEvent => {
        console.log(
          'Upload Progress: ' +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            '%'
        );
      },
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };
    axios
      .put('http://localhost:8000/auth/edit-profile', formData, config)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(error => this.setState({ errors: error.response.data.errors }));
  };

  addImage = e => {
    this.setState({ image: e.target.files[0] });
    console.log(this.state.image);
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
    const { username, email, image } = this.state;
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
          value={username}
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
          value={email}
        />
        {this.state.errors.length > 0 && this.errorMessage('email')}
        <input
          className='image'
          name='image'
          type='file'
          onChange={this.addImage}
        />
        <br />
        <button className='btnEdit' onClick={this.editProfile}>
          Edit
        </button>
      </div>
    );
  }
}

export default EditProfile;
