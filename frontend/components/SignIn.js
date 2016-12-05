import React from 'react';

export default class SignIn extends React.Component{
  render() {
    return (
      <div>
        <h1 className="align-center">Sign in</h1>
          <p>Email</p>
          <p><input type="text" ref='email' id="email" /></p>
          <p>Password</p>
          <p><input type="password" ref='password' id="password"/></p>
          <button id='sign_in' onClick={this.Login.bind(this)}>Send</button>
      </div>
    );
  }
}
