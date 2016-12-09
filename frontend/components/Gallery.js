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
    this.props.updatingGalleryStart()
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
    let i=0;
    const {files, user,current_user}=this.props
    const gallery= (typeof user.gallery =='undefined')?'':user.gallery.images.slice(-10).map(function(image){
        return <img key={image.id} className="padding inline-block" src={image.image.smaller.url} style={{width: 67, height: 67}} ></img>
      })
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Gallery</h3>
        <div style={{ borderStyle: 'double',textAlign: 'center', backgroundColor:'#5b4a77', paddingTop: '10px', paddingBottom: '10px'}}>
          {(user.gallery.images.length>0)? gallery : <h3>Gallery is empty now</h3>}
        </div>
          {(user.id!= current_user.id)? '':
          <Dropzone ref="dropzone" style={{height: '70px', width: '370px', borderStyle: 'double', paddingLeft: '20px',margin: '5px'}} onDrop={this.onDrop.bind(this)} >
            <div ><h4>Drop image here to upload into yours gallery </h4></div>
          </Dropzone>}
          {(files.length >0 )? <div >
          <h4 style={{margin: '5px'}}>You add {files.length} images.</h4>
          <div >
            {files.map((file) => <img src={file.preview} width="50" height="50"/>)}
          </div>
          <button style={{ margin: '5px'}}  onClick={this.uploadImages.bind(this)}>Upload files</button>
          </div> : null}
          { (!this.props.updating_gallery )? null: <div style={{paddingLeft: '180px'}}><img   src='images/loading/loading.gif' style={{ height: '50px', width: '50px'}}></img></div>}
      </div>
    );
  }
}
