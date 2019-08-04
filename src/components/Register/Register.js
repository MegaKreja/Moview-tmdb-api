import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

class Register extends Component {
  render() {
    return (
      <div className='register'>
        <h2>Register</h2>
        <label htmlFor='username'>Username</label>
        <input
          className='username'
          name='username'
          placeholder='johnsmith'
          type='text'
        />
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
        <Link to='/login'>Already have an account?</Link>
        <br />
        <button className='btnRegister'>Create your account</button>
      </div>
    );
  }
}

export default Register;
