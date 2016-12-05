import React from 'react';
import SignIn from './components/SignIn'
export default class App extends React.Component {
  render() {
    if (this.props.current_user== null){
      return(<SignIn/>)}
    return (<div>{this.props.children}</div>
    );
  }
}
