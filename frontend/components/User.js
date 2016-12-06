import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from "../actions/userActions"
import * as currentUserActions from "../actions/currentUserActions"
import News from './News'
import Profile from './Profile'
import Gallery from './Gallery'
import Friends from './Friends'

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
    console.log(this.props)
    return (
      <div>
      Welcome to User Profile
        <Profile user={this.props.user}/>
        <Friends user={this.props.user} addFriend={this.props.userActions.addFriend} deleteIncoming={this.props.userActions.deleteIncoming}/>
        <Gallery user={this.props.user} files={this.props.files} updateFiles={this.props.userActions.updateFiles}
           updateGallery={this.props.userActions.updateGallery}/>
        <News user={this.props.user} updateNews={this.props.userActions.updateNews}
          text={this.props.text} updateNewsText={this.props.userActions.updateNewsText}
          news_files={this.props.news_files} updateNewsFiles={this.props.userActions.updateNewsFiles}/>
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
