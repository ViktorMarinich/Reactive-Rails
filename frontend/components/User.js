import React, { Component, propTypes } from 'react';
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

class User extends Component{
  componentWillMount(){
    this.props.userActions.fetchUser(this.props.params.userId)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params != this.props.params){
      this.props.userActions.fetchUser(nextProps.params.userId)
      this.props.currentUserActions.fetchCurrentUser()
      this.props.userActions.updateNewsText('')
    }
  }
  render() {
    const {user, current_user, files,updating_news,updating_gallery, counter, prevParams,text,news_files }=this.props
    const style={ menuItem: {width: '300px', display: 'inline-block'}}
    if (typeof user.friends == 'undefined'){
      return <div>Loading ...</div>
    }
    const { addFriend,updateFiles,  updateGallery,setPrevParams,deleteIncoming,
            deleteFriend,  createRelationships,updateNewsFiles, updateNewsText,
            fetchUser,setCounter, updatingGalleryStart, updateNews } = this.props.userActions
    const { fetchCurrentUser }=this.props.currentUserActions
    return (
      <div style={{display: 'flex', width: '870px',flexDirection: 'row', justifyContent: 'space-around'}}>
        <div style={{width: '400px'}}>
          <Profile user={user}/>
          {(current_user.id!=user.id)?
            <RelationshipRequest  fetchCurrentUser={fetchCurrentUser} createRelationships={createRelationships}
             deleteFriend={deleteFriend} user={user}  current_user={current_user}/> :''}
          <Friends user={user} current_user={current_user} fetchUser={fetchUser} addFriend={addFriend} deleteIncoming={deleteIncoming}/>
        </div>
        <div style={{width: '400px'}}>
          <Gallery user={user} current_user={current_user} files={files} updateFiles={updateFiles}
            updatingGalleryStart={updatingGalleryStart} updating_gallery={updating_gallery} updateGallery={updateGallery}/>
          <News updating_news={updating_news} user={user} counter={counter} prevParams={prevParams} setPrevParams={setPrevParams}
            setCounter={setCounter} updateNews={updateNews} text={text} updateNewsText={updateNewsText} news_files={news_files} updateNewsFiles={updateNewsFiles}/>
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
    updating_news: state.user.updating_news,
    updating_gallery: state.user.updating_gallery,
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
