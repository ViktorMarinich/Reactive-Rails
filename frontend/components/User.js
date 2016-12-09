import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from "../actions/userActions"
import * as currentUserActions from "../actions/currentUserActions"
import News from './News'
import Profile from './Profile'
import Gallery from './Gallery'
import Friends from './Friends'
import RelationshipRequest  from './RelationshipRequest'
import { Link } from 'react-router';

const style={
  menuItem: {width: '300px', display: 'inline-block'}
}

class User extends Component{
  componentWillMount(){
    this.props.userActions.fetchUser(this.props.params.userId)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params != this.props.params){
      this.props.userActions.fetchUser(nextProps.params.userId)
      this.props.userActions.updateNewsText('')
    }
  }
  render() {
    const {user, current_user, files, counter, prevParams,text,news_files}=this.props
    const {addFriend,updateFiles, updateGallery,setPrevParams,deleteIncoming,deleteFriend,
      createRelationships,updateNewsFiles, updateNewsText, setCounter, updateNews}=this.props.userActions
    const {fetchCurrentUser}=this.props.currentUserActions
    return (
      <div style={{display: 'flex', width: '770px', backgroundColor: 'grey',flexDirection: 'row', justifyContent: 'space-around'}}>
        <div style={style.menuItem}>
          <Profile user={user}/>
          {(current_user.id!=user.id)? <RelationshipRequest  fetchCurrentUser={fetchCurrentUser}
           createRelationships={createRelationships} deleteFriend={deleteFriend} user={user}
           current_user={current_user}/> :''}
          <Friends user={user} current_user={current_user} addFriend={addFriend} deleteIncoming={deleteIncoming}/>
        </div>
        <div style={style.menuItem}>
          <Gallery user={user} files={files} updateFiles={updateFiles} updateGallery={updateGallery}/>
          <News user={user} counter={counter} prevParams={prevParams} setPrevParams={setPrevParams}
            setCounter={setCounter} updateNews={updateNews}
          text={text} updateNewsText={updateNewsText}
          news_files={news_files} updateNewsFiles={updateNewsFiles}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    text: state.user.text,
    files: state.user.files,
    counter: state.user.counter,
    prevParams: state.user.prevParams,
    news_files: state.user.news_files,
    current_user: state.currentUser.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    currentUserActions: bindActionCreators(currentUserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
