import React, { Component } from 'react';
import axios from 'axios';
import './ResetPassword.css';

class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    errors: []
  };

  changePassword = () => {
    const { email, password, password2 } = this.state;
    const user = { email, password, password2 };
    axios
      .post('http://localhost:8000/auth/forgot-password', user)
      .then(res => {
        console.log(res);
        this.props.history.push('/login', { message: res.data.message });
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
    return (
      <div className='reset'>
        <h2>Login</h2>
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
        <label htmlFor='password'>New Password</label>
        <input
          style={{
            border: this.errorMessage('password') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ password: e.target.value })}
          className='pw'
          name='password'
          placeholder='Type new Password'
          type='password'
        />
        {this.state.errors.length > 0 && this.errorMessage('password')}
        <label htmlFor='confirmPassword'>Confirm New Password</label>
        <input
          style={{
            border: this.errorMessage('password2') && '2px solid #e88073'
          }}
          onChange={e => this.setState({ password2: e.target.value })}
          className='pw'
          name='password2'
          placeholder='Confirm your new password'
          type='password'
        />
        {this.state.errors.length > 0 && this.errorMessage('password2')}
        <br />
        <button onClick={this.changePassword} className='btnReset'>
          Reset Password
        </button>
      </div>
    );
  }
}

export default ResetPassword;
