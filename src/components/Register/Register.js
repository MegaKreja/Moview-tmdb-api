import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  register = () => {
    const { username, email, password, password2 } = this.state;
    const user = {
      username,
      email,
      password,
      password2
    };
    axios
      .post('http://localhost:8000/register', user)
      .then(res => {
        console.log(res);
        if (res.data.message === 'Success') {
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div className='register'>
        <h2>Register</h2>
        <label htmlFor='username'>Username</label>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className='username'
          name='username'
          placeholder='johnsmith'
          type='text'
        />
        <label htmlFor='email'>Email</label>
        <input
          onChange={e => this.setState({ email: e.target.value })}
          className='email'
          name='email'
          placeholder='johnsmith@gmail.com'
          type='text'
        />
        <label htmlFor='password'>Password</label>
        <input
          onChange={e => this.setState({ password: e.target.value })}
          className='pw'
          name='password'
          placeholder='Type a Password'
          type='password'
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          onChange={e => this.setState({ password2: e.target.value })}
          className='pw'
          name='password2'
          placeholder='Confirm your password'
          type='password'
        />
        <Link to='/login'>Already have an account?</Link>
        <br />
        <button onClick={this.register} className='btnRegister'>
          Create your account
        </button>
      </div>
    );
  }
}

export default Register;
