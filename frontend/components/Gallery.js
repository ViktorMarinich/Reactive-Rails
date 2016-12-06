import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';

export default class Gallery extends React.Component{

  onDrop(files) {
    this.props.updateFiles(files);
  }
  uploadImages(){
    const data = new FormData();
    this.props.files.map((file)=>{ data.append( `image[${file.name}]`, file)})
     axios.post('/images', data)
     .then((response) => {
      })

  }
  onOpenClick () {
     this.refs.dropzone.open();
  }
  render() {
    return (
      <div>
          <Dropzone ref="dropzone"   onDrop={this.onDrop.bind(this)} >
            <div style={{height: 100}}><h4>Drop image here to upload </h4></div>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick.bind(this)}>
              Open file
          </button>
          {(this.props.files.length >0 )? <div >
          <button  onClick={this.uploadImages.bind(this)}>Upload files</button>
          <h4>You add {this.props.files.length} images.</h4>
          <div >
            {this.props.files.map((file) => <img  src={file.preview} width="50" height="50"/>)}
          </div>
          </div> : null}
      </div>
    );
  }
}
