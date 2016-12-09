import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class Friends extends React.Component{
  componentWillMount(){
  }
  AddFriend(friend){
    this.props.addFriend({friend_id: friend.id})
    this.props.deleteIncoming(friend.id)
  }
  render() {
    const {user, current_user }=this.props
    const {incoming,outcoming, friends }=this.props.user
    const friend_list = (typeof friends=='undefined')?'':friends.slice(0,8).map((friend)=>{
      return (
        <div key={friend.id} style={{display: 'flex',  paddingLeft: '20px', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'flex-start'}} >
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
          <img  src={friend.avatar.smaller.url} style={{width: 72, height: 72}} ></img>
          <h5 style={{ margin: '3px', textAlign: 'center'}}>{friend.name}</h5>
          </Link>
          <button style={{ textAlign: 'center' ,marginBottom: '10px',marginLeft: '10px'}} onClick={this.AddFriend.bind(this,friend)}>Accept</button>
        </div>)
    })
    const outcoming_list = (typeof outcoming=='undefined')?'':outcoming.map(function(friend){
      return (
        <div key={friend.id} style={{display: 'flex', paddingLeft: '20px', flexDirection: 'column', justifyContent: 'flex-start',alignItems: 'flex-start'}} >
          <Link to={`/user/${friend.id}`}>
          <img  src={friend.avatar.smaller.url} style={{width: 72, height: 72}} ></img>
          <h5 style={{ margin: '3px', textAlign: 'center'}}>{friend.name}</h5>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Friends</h3>
        <h5 style={{ textAlign: 'center', marginTop: '5px'}}>({user.name} have {(typeof user.friends.length!= 'undefined')? user.friends.length: null} friends)</h5>
        <div style={{   display: 'flex',borderStyle: 'double', backgroundColor:'#596768',paddingTop: '20px', paddignBot: '20px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
          {friend_list}
        </div>
        {(current_user.id==user.id && (user.incoming.length>0))?
          <div>
            <h3>Incoming requests</h3>
              <div style={{   display: 'flex',borderStyle: 'double', backgroundColor:'#7b936d',paddingTop: '20px', paddignBot: '20px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
                {incoming_list}
              </div>
         </div>: ''}
        {(current_user.id==user.id && (user.outcoming.length>0))?
          <div>
             <h3>Outcoming requests</h3>
            <div style={{   display: 'flex',borderStyle: 'double', backgroundColor:'#7b936d',paddingTop: '20px', paddignBot: '20px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
             {outcoming_list}
            </div>
          </div> : ''}
      </div>
    );
  }
}
