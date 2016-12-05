import React from 'react';

export default class App extends React.Component {
  render() {
    if (this.props.current_user== null){
      return(<SignIn/>)}
    return (<div>{this.props.children}</div>
    );
  }
}
