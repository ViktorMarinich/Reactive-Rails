import React from 'react';
import axios from "axios";

export default class News extends React.Component{
  createNews(){
    this.props.updateNews({id: this.props.user.id,news: {text: this.props.text}})
    this.props.updateNewsText('')
  }
  changeContent = (e) => {
    this.props.updateNewsText( e.target.value)
  }
  render() {
    const news=(typeof this.props.user.wall=='undefined')? '': this.props.user.wall.news.sort(  function(a, b) {
    if (a.id > b.id) { return -1;}
    if (a.id < b.id) { return 1; }
    return 0; }).map( function (news) {
    return  (<div key={news.id}>{news.text}</div>)
  })
  return (
    <div className='border shadow'>
      <h3 className='align-center'>News</h3>
      <textarea value={this.props.text} id='news' ref='comment'  onChange={this.changeContent}  type='text' placeholder='Type yours comment' cols='32' rows='2'/>
      <button id='create_news' onClick={this.createNews.bind(this)}>Send</button>
       {news}
    </div>
    )
  }
}
