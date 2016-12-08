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
    const {children} = this.props

    if (typeof this.props.current_user=='undefined') {return <div>Loading...</div>}
    if (this.props.current_user== null){
      return(
        <div>
          <SignIn router={this.props.router} fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
          <SignUp router={this.props.router} files={this.props.files} updateFiles={this.props.userActions.updateFiles} fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
        </div>
    )}
    return (
      <div style={{display: 'flex', width: '1000px', backgroundColor: 'grey',flexDirection: 'row', justifyContent: 'space-around'}}>
        <div style={{width: '200px', display: 'inline-block'}}>
          <p><Link to={`/user/${this.props.current_user.id}`}>My profile</Link></p>
          <p><Link to={`/settings`}>Settings</Link></p>
          <p><Link to={`/friends`}>Friends</Link></p>
          <p><Link to={`/gallery`}>Gallery</Link></p>
          <p><Link to={`/news`}>News</Link></p>
          <p><Link to='/' onClick={this.SignOut.bind(this)}>Sign Out</Link></p>
        </div>
        <div>{this.props.children&& React.cloneElement(this.props.children, {current_user:
            this.props.current_user, files: this.props.files, router: this.props.router, counter: this.props.counter,
             updateFiles: this.props.userActions.updateFiles,allNews: this.props.allNews, fetchNews: this.props.currentUserActions.fetchNews,setCounter: this.props.userActions.setCounter, fetchCurrentUser: this.props.currentUserActions.fetchCurrentUser})}</div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {
    current_user: state.currentUser.currentUser,
    allNews: state.currentUser.allNews,
    files: state.user.files,
    counter: state.user.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    currentUserActions: bindActionCreators(currentUserActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
