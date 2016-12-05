import React from 'react';
import axios from 'axios';


export default class SignUp extends React.Component{
  CreateUser() {

  }

  render() {
    return (
      <div>
        <h1 className="align-center">Sign Up</h1>
            <p>Name</p>
            <p><input  size="30"  type="text" ref='name' id='name_field' /></p>
            <p>Email</p>
            <p><input  size="30" ref='email' type="text" id='email_field'/></p>
            <p>Password</p>
            <p><input  size="30" ref='password' type="password"  id='password_field'/> </p>
            <p>Password confirmation</p>
            <p><input size="30" type="password" ref='password_confirmation' id='password_confirmation_field'/></p>
            <button id="sign_up" onClick={this.CreateUser.bind(this)}>Sign Up</button>
      </div>
    );
  }
}
