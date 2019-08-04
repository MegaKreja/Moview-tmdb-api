import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className='login'>
        <h2>Login</h2>
        <label htmlFor='username'>Username</label>
        <input
          className='username'
          name='username'
          placeholder='johnsmith'
          type='text'
        />
        <label htmlFor='password'>Password</label>
        <input
          className='pw'
          name='password'
          placeholder='Type a Password'
          type='password'
        />
        <Link to='/login/forgottenpassword'>Forgot password?</Link>
        <br />
        <button className='btnLogin'>Login</button>
        <Link to='/register'>Not a member? Register now</Link>
      </div>
    );
  }
}

export default Login;
