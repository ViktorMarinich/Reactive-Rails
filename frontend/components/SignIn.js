import React from 'react';
import axios from "axios";

export default class SignIn extends React.Component{
  Login() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    axios.post('/sessions', {session: {email: email, password: password}})
      .then((response) => {
        this.props.fetchCurrentUser()
        this.props.router.push(`user/${response.data.id}`)
      })
  }
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
