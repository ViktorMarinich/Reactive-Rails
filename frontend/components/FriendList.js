import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class FriendList extends React.Component{
  constructor(props){
    super(props);
    this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillMount(){
    this.props.fetchCurrentUser()
    this.props.setCounter(25)
  }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteLoad);
  }
  LoadMore() {
    this.props.setCounter(this.props.counter+25)
  }

  infiniteLoad(){
    if((this.props.counter - this.props.current_user.friends.length)>= 25){return null}
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
     if (height< 40){this.LoadMore()}
  }
  render() {
    const current_user= this.props.current_user
    const friends = current_user.friends.slice(0,this.props.counter).map((friend)=>{
     return <div key={friend.id}>
       <Link to={`/user/${friend.id}`}>
        <div style={{display: 'flex', marginTop: '10px', paddingLeft: '20px', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}} >
       <img key={friend.id}  src={friend.avatar.small.url} style={{width: 85, height: 85}} ></img>
       <h3 style={{ margin: '3px', textAlign: 'center',paddingLeft: '10px'}}>{friend.name}</h3>
       </div>
       </Link>
       </div>
     })
     let i=1
    return (
      <div  style={{width: '870px' }}>
        <h3 style={{ textAlign: 'center'}}>Friends</h3>
          <div style={{display: 'flex', borderStyle: 'double',textAlign: 'left', paddingLeft:'100px' ,backgroundColor:'#823737', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', paddingBottom: '10px'}}>
          {(current_user.friends.length>0)?  friends : <h3 style={{textAlign: 'center'}}>No friends in yours list</h3>}
        </div>
      </div>
      )
    }
}
