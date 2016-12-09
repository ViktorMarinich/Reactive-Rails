import React from 'react';
import axios from "axios";
import { Link } from 'react-router';

export default class GalleryPage extends React.Component{
  constructor(props){
    super(props);
    this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillMount(){
    this.props.fetchCurrentUser()
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
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
     if (height< 60){this.LoadMore()}
  }
  render() {
    const current_user= this.props.current_user
    const revert= 0 - this.props.counter
    const images = current_user.gallery.images.slice(revert).sort(  function(a, b) {
      if (a.id > b.id) { return -1;}
      if (a.id < b.id) { return 1; }
      return 0; }).map((image)=>{
        return   <img key={image.id}  src={image.image.url} style={{width: '700px'}} ></img>
      })
    return (
      <div style={{width: '870px' }}>
        <h3 style={{ textAlign: 'center'}}>Gallery</h3>
        <div style={{display: 'flex', width: '770px', borderStyle: 'double',paddingBottom: '10px',textAlign: 'left', backgroundColor:'#823737', paddingLeft: '20px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}} >
          {images}
        </div>
      </div>
      )
    }
}
