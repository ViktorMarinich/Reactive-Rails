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
    const friend_list = (typeof friends=='undefined')?'':friends.slice(0,9).map((friend)=>{

      return (
        <div key={friend.id} style={{display: 'flex', paddingLeft: '20px', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'flex-start'}} >
        <Link to={`/user/${friend.id}`}>
        <img   src={friend.avatar.smaller.url} style={{width: 72, height: 72}} ></img>
        <h5 style={{ margin: '3px', textAlign: 'center'}}>{friend.name}</h5>
        </Link>
        </div>)

    })
    const incoming_list = (typeof incoming=='undefined')?'':incoming.map((friend)=>{
      return (
        <div key={friend.id} style={{display: 'flex', paddingLeft: '20px', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'flex-start'}} >
        <Link to={`/user/${friend.id}`}>
        <img key={friend.id}  src={friend.avatar.smaller.url} style={{width: 72, height: 72}} ></img>
        <h5 style={{ margin: '3px', textAlign: 'center'}}>{friend.name}</h5>
        </Link>
          <button onClick={this.AddFriend.bind(this,friend)}>Add to friends</button>
        </div>)
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
          <div style={{   display: 'flex',flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
        {friend_list}
      </div>
      {(this.props.current_user.id==this.props.user.id)? <div>
        <h3>Incoming requests</h3>
        {incoming_list}
        <h3>Outcoming requests</h3>
        {outcoming_list}</div>: ''}

      </div>
    );
  }
}
