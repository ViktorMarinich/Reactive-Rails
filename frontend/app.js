import React, { Component } from 'react';
import SignIn from './components/SignIn'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as currentUserActions from "./actions/currentUserActions"

class App extends Component {
  componentDidMount(){
    this.props.currentUserActions.fetchCurrentUser()
  }

  render() {
    console.log(this.props)
    if (this.props.current_user== null){
      return(<SignIn fetchCurrentUser={this.props.currentUserActions.fetchCurrentUser}/>)}
    return (<div>{this.props.children}</div>
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
