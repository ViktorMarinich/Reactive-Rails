import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class RelationshipRequest extends React.Component{
  SendInvite(){
    this.props.createRelationships({friend_id: this.props.user.id})
  }
  DeleteFriend(){
    this.props.deleteFriend({id: this.props.current_user.id, friend_id: this.props.user.id, })
    this.props.fetchCurrentUser()

  }
  render() {
    const {current_user, user} = this.props
    const friends_length = (typeof current_user.friends.length=='undefined')? 0 : current_user.friends.length
    let is_friends = false;
    (friends_length > 0)? current_user.friends.map((friend)=>{
      if(user.id == friend.id) {
        is_friends= true
      }
    }) : ''
    const requests_length = (typeof user.incoming=='undefined')? 0 : user.incoming.length
    let outcoming_requests =  false;
    (requests_length > 0 )? user.incoming.map((friend)=>{
      if(current_user.id == friend.id) {
        outcoming_requests = true
      }
    }) : ''
    if (is_friends){
      return  <div style={{  borderStyle: 'double', backgroundColor:'#7b936d',marginTop: '20px', paddignBottom: '20px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
        <h3 style={{ textAlign: 'center'}}>User in yours friend list</h3>
        <button style={{ textAlign: 'center' ,marginBottom: '10px',marginLeft: '10px'}} id='Delete' onClick={this.DeleteFriend.bind(this)}>Delete</button>
      </div>
    }
    return (
      <div style={{  borderStyle: 'double', backgroundColor:'#7b936d',paddingTop: '20px', paddignBottom: '20px', marginTop: '15px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
         {(outcoming_requests)? <h3 style={{ textAlign: 'center'}}>You send friend request to {user.name}</h3> :
          <button style={{ textAlign: 'center',marginBottom: '10px',marginLeft: '10px'}} onClick={this.SendInvite.bind(this)}>Add to friends</button>}
      </div>
    );
  }
}
