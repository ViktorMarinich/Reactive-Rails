import React from 'react';
import axios from "axios";

export default class Profile extends React.Component{

  render() {
    const inline ={inline: 'inline-block', margin: '0',padding: '0'}
    const {name , email, id,  avatar} =this.props.user
    console.log(this.props)
    if (typeof avatar=='undefined'){ return <div>Loading..</div>}
    return (
      <div>
      <h3 style= {{inline, textAlign: 'center'}}>Profile info</h3>
      <div style={{ borderStyle: 'double',textAlign: 'center', backgroundColor:'#7b936d'}}>
        <h4 style= {{inline}}>Name: {name}</h4>
        <img style= {{inline, marginBottom: '15px', borderStyle: 'double' , backgroundColor:'white'}} src={avatar.small.url}></img>
        </div>
      </div>
    );
  }
}
