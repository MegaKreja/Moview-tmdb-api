import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: []
  };

  register = () => {
    const { username, email, password, password2 } = this.state;
    const user = {
      username,
      email,
      password,
      password2
    };
    this.setState({ errors: [] });
    axios
      .post('http://localhost:8000/auth/register', user)
      .then(res => {
        console.log(res);
        if (res.data.message === 'Success') {
          this.props.history.push('/login');
        }
      })
      .catch(error => {
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
    return (
      <div className='register'>
        <h2>Register</h2>
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
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          style={{
            border: this.errorMessage('password2') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ password2: e.target.value })}
          className='pw'
          name='password2'
          placeholder='Confirm your password'
          type='password'
        />
        {this.state.errors.length > 0 && this.errorMessage('password2')}
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
