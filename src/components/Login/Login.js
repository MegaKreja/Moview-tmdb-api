import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: []
  };

  login = () => {
    const { username, password } = this.state;
    const user = {
      username,
      password
    };
    this.setState({ errors: [] });
    axios
      .post('http://localhost:8000/auth/login', user)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({ errors: error.response.data.errors });
      });
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
    const resetPassMessage =
      this.props.location.state && this.props.location.state.message;
    return (
      <div className='login'>
        <h2>Login</h2>
        <h4>{resetPassMessage}</h4>
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
        <label htmlFor='password'>Password</label>
        <input
          style={{
            border: this.errorMessage('password') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ password: e.target.value })}
          className='pw'
          name='password'
          placeholder='Type a Password'
          type='password'
        />
        {this.state.errors.length > 0 && this.errorMessage('password')}
        <Link to='/login/forgottenpassword'>Forgot password?</Link>
        <br />
        <button className='btnLogin' onClick={this.login}>
          Login
        </button>
        <Link to='/register'>Not a member? Register now</Link>
      </div>
    );
  }
}

export default Login;
