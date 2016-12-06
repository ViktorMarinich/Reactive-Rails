import React from 'react';
import axios from "axios";

export default class Profile extends React.Component{

  render() {
    const {name , email, id,  avatar} =this.props.user
    console.log(this.props)
    if (typeof avatar=='undefined'){ return <div>Loading..</div>}
    return (
      <div>
        <h3>Profile info</h3>
        <img src={avatar.small.url}></img>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
        <h3>Email: {id}</h3>
      </div>
    );
  }
}
