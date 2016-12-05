import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from "../actions/userActions"
import * as currentUserActions from "../actions/currentUserActions"
import News from './News'
import Profile from './Profile'

class User extends Component{
  componentWillMount(){
    this.props.userActions.fetchUser(this.props.params.userId)
  }
  render() {
    console.log('pro',this.props)
    return (
      <div>
      Welcome to User Profile
        <Profile user={this.props.user}/>
        <News user={this.props.user} updateNews={this.props.userActions.updateNews}
          text={this.props.text} updateNewsText={this.props.userActions.updateNewsText}/>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user.user,
    text: state.user.text,
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
