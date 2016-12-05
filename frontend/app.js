import React, { Component } from 'react';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as currentUserActions from "./actions/currentUserActions"
import { Link } from 'react-router';

class App extends Component {
  componentDidMount(){
    this.props.currentUserActions.fetchCurrentUser()
  }

  render() {
    console.log(this.props)
    if (this.props.current_user== null){
      return(
        <div>
          <SignIn fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
          <SignUp fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>
        </div>
    )}
    return (
      <div>
        <Link to={`/user/${this.props.current_user.id}`}>My profile</Link>
        <div>{this.props.children}</div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {
    current_user: state.currentUser.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    currentUserActions: bindActionCreators(currentUserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
