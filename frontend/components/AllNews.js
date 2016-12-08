import React from 'react';
import axios from "axios";
import { Link } from 'react-router';
import NewsItem from './NewsItem'

export default class AllNews extends React.Component{
  constructor(props){
    super(props);
    this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillMount(){
      this.props.setCounter(15)
      this.props.fetchNews()
    }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteLoad);
  }
  LoadMore() {
    this.props.setCounter(this.props.counter+10)
  }

  infiniteLoad(){
  //  if((this.props.counter - this.props.current_user.friends.length)>= 25){return null}
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
     if (height< 60){this.LoadMore()}
  }
  render() {
    console.log(this.props)
    const current_user= this.props.current_user
    const news = (typeof this.props.allNews =='undefined')?'': this.props.allNews.slice(0,this.props.counter).sort(  function(a, b) {
          if (a.id > b.id) { return -1;}
          if (a.id < b.id) { return 1; }
          return 0; }).map((news)=>{
      return<NewsItem news={news} key={news.id} current_user={this.props.current_user} id={news.user_id}
             name={news.user.name} url={news.user.avatar.url} text={news.text}  />
    })
     let i=1
    return (
      <div  style={{width: '770px' }}>
        <h1 style={{ textAlign: 'center'}}>News</h1>
        <div style={{display: 'flex', paddingLeft: '20px', width: '300px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}} >
          {news}
        </div>
      </div>
      )
    }
}
