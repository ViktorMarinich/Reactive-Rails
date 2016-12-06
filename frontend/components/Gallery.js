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
       this.props.updateGallery(response.data)
       this.props.updateFiles([]);
      })
  }
  onOpenClick () {
     this.refs.dropzone.open();
  }
  render() {
    const {files, user}=this.props
    const gallery= (typeof this.props.user.gallery =='undefined')?'':this.props.user.gallery.images.map(function(image){
    return <img key={image.id} className="padding inline-block" src={image.image.smaller.url} style={{width: 72, height: 72}} ></img>
})
    return (
      <div>
          {gallery}
          <Dropzone ref="dropzone"   onDrop={this.onDrop.bind(this)} >
            <div style={{height: 100}}><h4>Drop image here to upload </h4></div>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick.bind(this)}>
              Open file
          </button>
          {(files.length >0 )? <div >
          <button  onClick={this.uploadImages.bind(this)}>Upload files</button>
          <h4>You add {files.length} images.</h4>
          <div >
            {files.map((file) => <img  src={file.preview} width="50" height="50"/>)}
          </div>
          </div> : null}
      </div>
    );
  }
}
