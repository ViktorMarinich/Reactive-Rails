import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class Friends extends React.Component{

  AddFriend(friend){
    this.props.addFriend({friend_id: friend.id})
    this.props.deleteIncoming(friend.id)
  }
  render() {
    console.log('fruend props',this.props)
    const {incoming,outcoming, friends }=this.props.user
    const friend_list = (typeof friends=='undefined')?'':friends.map((friend)=>{
      return   <Link to={`/user/${friend.id}`}>{friend.name}</Link>
    })
    const incoming_list = (typeof incoming=='undefined')?'':incoming.map((friend)=>{
      return (
        <div>
          <h5>{friend.name}</h5>
          <button onClick={this.AddFriend.bind(this,friend)}>Add to friends</button>
        </div>
      )
    })
    const outcoming_list = (typeof outcoming=='undefined')?'':outcoming.map(function(friend){
      return (
        <div>
          <h5>{friend.name}</h5>
        </div>
      )
    })
    return (
      <div>
        <h3>Friends</h3>
        {friend_list}
        <h3>Incoming requests</h3>
        {incoming_list}
        <h3>Outcoming requests</h3>
        {outcoming_list}
      </div>
    );
  }
}
