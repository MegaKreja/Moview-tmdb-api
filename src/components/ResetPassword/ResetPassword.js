import React, { Component } from 'react';
import './ResetPassword.css';

class ResetPassword extends Component {
  render() {
    return (
      <div className='reset'>
        <h2>Login</h2>
        <label htmlFor='email'>Email</label>
        <input
          className='email'
          name='email'
          placeholder='johnsmith@gmail.com'
          type='text'
        />
        <label htmlFor='password'>Password</label>
        <input
          className='pw'
          name='password'
          placeholder='Type a Password'
          type='password'
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          className='pw'
          name='password2'
          placeholder='Confirm your password'
          type='password'
        />
        <br />
        <button className='btnReset'>Reset Password</button>
      </div>
    );
  }
}

export default ResetPassword;
