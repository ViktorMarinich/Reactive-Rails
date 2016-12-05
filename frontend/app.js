import React from 'react';

export default class App extends React.Component {
  render() {
    if (this.props.current_user== null){
      return(<SignIn/>)}
    return (
      {this.props.children}
    );
  }
}
