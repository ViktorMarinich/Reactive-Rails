import React from 'react';
import { Link } from 'react-router';

export default class NewsItem extends React.Component{
  constructor(props){
    super(props);
    this.isYoutubeLink = this.isYoutubeLink.bind(this)
  }
  is_undefiend (el){
   return (typeof el!='undefined')? el  : ""
  }
  isYoutubeLink( text) {
    const url = text
    if (url != undefined || url != '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length >= 11&&(typeof match[2][11]=='undefined' || match[2][11] == ' ')) {
        return match[2].slice(0,11)
      } else {
        return false
      }
    }
  }
  render() {
    const images=(typeof this.props.news.gallery == 'undefined')? '':
    this.props.news.gallery.images.map(function(image){
      return <img key={image.id}  src={image.image.thumb.url} style={{padding: 1}}></img>
    })
    const video = (typeof this.isYoutubeLink(this.props.text) == 'boolean')? '' :  <iframe style={{marginLeft: '15px', marginBottom: '5px'}} id={this.props.id} src={`https://www.youtube.com/embed/${this.isYoutubeLink(this.props.text)}?autoplay=0`} width="262" height="230" frameBorder="0"  allowFullScreen type="text/html" ></iframe>
    return (
      <div key={this.props.id} style={{borderStyle: 'solid', backgroundColor: 'white',borderWidth: '1px', marginTop: '5px', padding: '3px'}}>
        <div style={{display: 'flex', flexDirection: 'row',borderBottomStyle: 'solid',borderBottomWidth: '1px', paddingBottom: '4px', justifyContent: 'flex-start',alignItems: 'flex-start'}}>
          <img src={this.is_undefiend (this.props.url)} style={{width: '50px', height: '50px'}}></img>
          <h5 style={{paddingLeft: '5px', marginTop: '5px'}}>User: {this.props.name}</h5>
        </div>
        <div style={{ minWidth: '300px', flexWrap: 'wrap',  alignContent: 'stretch', justifyContent: 'flex-start'}}>
          <h3 style={{ wordBreak: 'break-all', paddingLeft: '5px', textAlign: 'justify'}}>{this.props.text}</h3>
          <div style={{ minWidth: '300px', flexWrap: 'wrap',  alignContent: 'stretch'}}>
            {images}
          </div>
          {video}
        </div>
      </div>
    )
  }
}
