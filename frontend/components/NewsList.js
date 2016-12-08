import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';
import NewsItem from './NewsItem'

export default class  NewsList  extends React.Component{
  constructor(props){
    super(props);
    this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id!= this.props.prevParams){
      this.props.setPrevParams(nextProps.user.id)
      this.props.setCounter(10)
    }
  }
  componentWillMount(){
      this.props.setPrevParams(this.props.user.id)
      this.props.setCounter(10)
    }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteLoad);
  }
  LoadMore() {
    this.props.setCounter(this.props.counter+5)
  }

  infiniteLoad(){
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
     if (height< 60){this.LoadMore()}
  }
    render() {
      console.log (this.props.counter)
     const current_user= this.props.current_user
     let revert= 0 - this.props.counter
     const news = this.props.user.wall.news.slice(revert).sort(  function(a, b) {
           if (a.id > b.id) { return -1;}
           if (a.id < b.id) { return 1; }
           return 0; }).map((news)=>{
       return<NewsItem news={news} key={news.id} current_user={this.props.current_user} id={news.user_id}
              name={news.user.name} url={news.user.avatar.url} text={news.text}  />
     })
    return (
        <div>
          <h3>News</h3>
          {news}
        </div>
      )
    }
}
