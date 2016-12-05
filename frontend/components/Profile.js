import React from 'react';
import axios from "axios";

export default class Profile extends React.Component{

  render() {
    const {name , email, id} =this.props.user
    return (
      <div>
        <h3>Profile info</h3>
        <img src='' width='200' height='200'></img>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
        <h3>Email: {id}</h3>
      </div>
    );
  }
}
