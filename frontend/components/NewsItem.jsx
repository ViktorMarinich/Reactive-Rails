import React from 'react';
import { Link } from 'react-router';

export default class NewsItem extends React.Component{

  is_undefiend (el){
   return (typeof el!='undefined')? el  : ""
  }

  render() {
    const images=(typeof this.props.news.gallery == 'undefined')? '':
    this.props.news.gallery.images.map(function(image){
      return <img key={image.id}  src={image.image.thumb.url} style={{padding: 1}}></img>
    })
    return (
    <div key={this.props.id} style={{borderStyle: 'solid', backgroundColor: 'white',borderWidth: '1px', marginTop: '5px', padding: '3px'}}>
      <div style={{display: 'flex', flexDirection: 'row',borderBottomStyle: 'solid',borderBottomWidth: '1px', paddingBottom: '4px', justifyContent: 'flex-start',alignItems: 'flex-start'}}>
        <img src={this.is_undefiend (this.props.url)} style={{width: '50px', height: '50px'}}></img>
        <h5 style={{paddingLeft: '5px', marginTop: '5px'}}>User: {this.props.name}</h5>
      </div>
      <div style={{display: 'flex',  flexDirection: 'column', alignItems:'flex-start', justifyContent: 'flex-start'}}>
        <h3>{this.props.text}</h3>
        <div>
          {images}
        </div>
      </div>
    </div>)
  }
}
