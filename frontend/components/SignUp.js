import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';


export default class SignUp extends React.Component{
  CreateUser() {
    const data = new FormData();
    data.append( `user[avatar]`, this.props.files[0])
    data.append( `user[email]`, this.refs.email.value)
    data.append( `user[name]`, this.refs.name.value)
    data.append( `user[password]`, this.refs.password.value)
    data.append( `user[password_confirmation]`, this.refs.password_confirmation.value)
    axios.post('/users',  data)
      .then((response) => {
        this.props.fetchCurrentUser()
        this.props.router.push(`user/${response.data.id}`)
      })
  }
  onDrop(files) {
    this.props.updateFiles(files.slice(0,1));
    console.log(files.slice(0,1))
    console.log(this.props.files)
  }
  onOpenClick () {
     this.refs.dropzone.open();
  }
  render() {
    const {files} = this.props
    return (
      <div>
        <h1 className="align-center">Sign Up</h1>
            <p>Name</p>
            <p><input  size="30"  type="text" ref='name' id='name_field' /></p>
            <p>Email</p>
            <p><input  size="30" ref='email' type="text" id='email_field'/></p>
              <Dropzone ref="dropzone"   onDrop={this.onDrop.bind(this)} >
                <div style={{height: 100}}><h4>Drop image here to upload </h4></div>
              </Dropzone>
              <button type="button" onClick={this.onOpenClick.bind(this)}>
                  Open file
              </button>
              {(files.length >0 )? <div >
              <h4>You add {files.length} images.</h4>
              <div >
                {files.map((file) => <img  src={file.preview} width="50" height="50"/>)}
              </div>
              </div> : null}
            <p>Password</p>
            <p><input  size="30" ref='password' type="password"  id='password_field'/> </p>
            <p>Password confirmation</p>
            <p><input size="30" type="password" ref='password_confirmation' id='password_confirmation_field'/></p>
            <button id="sign_up" onClick={this.CreateUser.bind(this)} >Sign Up</button>
      </div>
    );
  }
}
