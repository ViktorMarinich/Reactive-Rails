import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class GalleryPage extends React.Component{
  constructor(props){
    super(props);
    this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillMount(){
      this.props.setCounter(3)
    }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteLoad);
  }
  LoadMore() {
    this.props.setCounter(this.props.counter+1)
  }

  infiniteLoad(){
  //  if((this.props.counter - this.props.current_user.friends.length)>= 25){return null}
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
     if (height< 40){this.LoadMore()}
  }
  render() {
    const current_user= this.props.current_user
    const images = this.props.current_user.gallery.images.slice(0,this.props.counter).map((image)=>{
     return   <img key={image.id}  src={image.image.url} style={{width: '700px'}} ></img>
     })
    return (
      <div style={{width: '770px' }}>
        <h1 style={{ textAlign: 'center'}}>Gallery</h1>
        <div style={{display: 'flex', width: '770px', paddingLeft: '20px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}} >
          {images}
        </div>
      </div>
      )
    }
}
