import React, { Component } from 'react';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as currentUserActions from "./actions/currentUserActions"
import * as userActions from "./actions/userActions"
import { Link } from 'react-router';
import axios from 'axios';

class App extends Component {
  componentDidMount(){
    this.props.currentUserActions.fetchCurrentUser()
  }
  SignOut(e){
    e.preventDefault()
    this.props.currentUserActions.destroySession()
  }
  render() {
    if (typeof this.props.current_user=='undefined') {return <div>Loading...</div>}
    console.log("CU",this.props.current_user)
    if (this.props.current_user== null){
      return(
        <div>
          <SignIn router={this.props.router} fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
          <SignUp router={this.props.router} files={this.props.files} updateFiles={this.props.userActions.updateFiles} fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
        </div>
    )}
    return (
      <div>
        <Link to={`/user/${this.props.current_user.id}`}>My profile</Link>
        <Link to='/' onClick={this.SignOut.bind(this)}>Sign Out</Link>
        <div>{this.props.children}</div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {
    current_user: state.currentUser.currentUser,
    files: state.user.files,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    currentUserActions: bindActionCreators(currentUserActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
