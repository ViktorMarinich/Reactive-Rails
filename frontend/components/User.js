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
    return (
      <div style={{display: 'flex', width: '770px', backgroundColor: 'grey',flexDirection: 'row', justifyContent: 'space-around'}}>
        <div style={style.menuItem}>
          <Profile user={this.props.user}/>
          {(this.props.current_user.id!=this.props.user.id)? <RelationshipRequest  fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser} createRelationships={this.props.userActions.createRelationships} deleteFriend={this.props.userActions.deleteFriend} user={this.props.user}  current_user={this.props.current_user}/> :''}
          <Friends user={this.props.user} current_user={this.props.current_user} addFriend={this.props.userActions.addFriend} deleteIncoming={this.props.userActions.deleteIncoming}/>
        </div>

        <div style={style.menuItem}>
          <Gallery user={this.props.user} files={this.props.files} updateFiles={this.props.userActions.updateFiles}
           updateGallery={this.props.userActions.updateGallery}/>
        <News user={this.props.user} updateNews={this.props.userActions.updateNews}
          text={this.props.text} updateNewsText={this.props.userActions.updateNewsText}
          news_files={this.props.news_files} updateNewsFiles={this.props.userActions.updateNewsFiles}/>
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
