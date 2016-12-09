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
   const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
    if (height< 60){
      this.LoadMore()
    }
  }
  render() {
    const {counter, allNews, current_user}= this.props
    const news = (typeof allNews =='undefined')?'':
      allNews.slice(0, counter).sort(  function(a, b) {
        if (a.id > b.id) { return -1;}
        if (a.id < b.id) { return 1; }
          return 0; }).map((news)=>{
            return <NewsItem news={news} key={news.id} current_user={current_user}
                   id={news.user_id}  name={news.user.name} url={news.user.avatar.url} text={news.text}  />
            })
    let i=1
    return (
      <div  style={{width: '870px' }}>
        <h3 style={{ textAlign: 'center'}}>News</h3>
        <div style={{ borderStyle: 'double',textAlign: 'center', backgroundColor:'#5b4a77', paddingTop: '10px', paddingBottom: '10px'}}>
          <div style={{display: 'flex', paddingLeft: '20px',marginLeft: '250px', width: '300px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}} >
            {news}
          </div>
        </div>
      </div>
      )
    }
}
