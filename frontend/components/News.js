import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';
import NewsList from './NewsList'

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
            <button id='create_news' onClick={this.createNews.bind(this)}>Send</button>
        </div>
        <NewsList user={this.props.user} />
    </div>
    )
  }
}
