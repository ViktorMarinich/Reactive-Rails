import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';

export default class Settings extends React.Component{
  constructor(props){
    super(props);
  }
  updateSettings(){
    const data = new FormData();
    if (typeof this.props.files[0] !== "undefined"){
    data.append( `user[avatar]`, this.props.files[0])}
    data.append( `user[email]`, this.refs.email.value)
    data.append( `user[name]`, this.refs.name.value)
    axios.patch(`/users/${this.props.current_user.id}`,  data)
      .then((response) => {
        this.props.router.push(`user/${response.data.id}`)
        this.props.fetchCurrentUser()
        this.props.updateFiles([]);
      })
  }
  onDrop(files) {
    this.props.updateFiles(files.slice(0,1));
  }

  onOpenClick () {
     this.refs.dropzone.open();
  }
  render() {
    const {current_user,files} = this.props
    return (
      <div style={{display: 'flex', width: '870px',flexDirection: 'column',alignContent: 'space-around', justifyContent: 'space-around'}}>
        <h3 style={{textAlign: 'center'}}>Settings</h3>
        <div style={{ borderStyle: 'double',textAlign: 'left', backgroundColor:'#823737', paddingLeft: '100px', paddingBottom: '10px'}}>
          <h3>Name</h3>
          <p><input type='text' id='edit_name' ref='name' defaultValue={current_user.name}/></p>
          <h3>Email</h3>
          <p><input type='text' id='edit_email' ref='email' defaultValue={current_user.email}/></p>
          <h3>Avatar</h3>
          <img src={current_user.avatar.smaller.url}></img>
          <Dropzone ref="dropzone" style={{display: 'none'}}  onDrop={this.onDrop.bind(this)} >
            <div style={{height: 100}}><h4>Drop image here to upload </h4></div>
          </Dropzone>
          <p><button type="button" onClick={this.onOpenClick.bind(this)}> Open file</button></p>
          {(files.length >0 )? <div >
          <h4>New avatar preview.</h4>
          <div >
            {files.map((file) => <img  src={file.preview} width="50" height="50"/>)}
          </div>
          </div> : null}
          <p><button id='save_changes' onClick={this.updateSettings.bind(this)}>Save</button></p>
        </div>
      </div>
    );
  }
}
