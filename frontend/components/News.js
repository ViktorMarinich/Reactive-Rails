import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';

export default class News extends React.Component{
  createNews(){
    const data = new FormData();
    this.props.news_files.map((file)=>{ data.append( `image[${file.name}]`, file)})
    data.append('id',this.props.user.id)
    data.append('news[text]', this.props.text)
    this.props.updateNews(data)
    this.props.updateNewsText('')
  }
  onDrop(files) {
    this.props.updateNewsFiles(files);
  }
  onOpenClick () {
     this.refs.dropzone.open();
  }
  changeContent = (e) => {
    this.props.updateNewsText( e.target.value)
  }
  render() {
    const {news_files, user}=this.props
    if (typeof user.wall == 'undefined'){
      return <div>Loading</div>
    }
    const news=(typeof user.wall=='undefined')? '': user.wall.news.sort(  function(a, b) {
    if (a.id > b.id) { return -1;}
    if (a.id < b.id) { return 1; }
      return 0; }).map( function (news) {
      let images=(typeof news.gallery == 'undefined')? '':news.gallery.images.map(function(image){
        return <img key={image.id}  src={image.image.thumb.url} style={{padding: 1}}></img>
      })
      return  (<div key={news.id}>{news.text} {images}</div>)
    })
  return (
    <div className='border shadow'>
      <h3 className='align-center'>News</h3>
      <textarea value={this.props.text} id='news' ref='comment'  onChange={this.changeContent}  type='text' placeholder='Type yours comment' cols='32' rows='2'/>
        <div>
            <Dropzone ref="dropzone"   onDrop={this.onDrop.bind(this)} >
              <div style={{height: 100}}><h4>Drop image here to upload </h4></div>
            </Dropzone>
            <button type="button" onClick={this.onOpenClick.bind(this)}>
                Open file
            </button>
            {(news_files.length >0 )? <div >
            <h4>You add {news_files.length} images.</h4>
            <div >
              {news_files.map((file) => <img src={file.preview} width="50" height="50"/>)}
            </div>
            </div> : null}
        </div>
      <button id='create_news' onClick={this.createNews.bind(this)}>Send</button>
       {news}
    </div>
    )
  }
}
