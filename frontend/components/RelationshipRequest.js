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
      return <div>
        <h3>User in yours friend list</h3>
        <button onClick={this.DeleteFriend.bind(this)}>Delete</button>
      </div>
    }
    return (
      <div>
         {(outcoming_requests)? <h3>You send friend request to {user.name}</h3> :
          <button onClick={this.SendInvite.bind(this)}>Add to friends</button>}
      </div>
    );
  }
}
