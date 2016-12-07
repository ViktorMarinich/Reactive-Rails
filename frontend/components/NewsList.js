import React from 'react';
import axios from "axios";
import Dropzone from 'react-dropzone';
import Infinite from 'react-infinite';
import NewsItem from './NewsItem'

export default class  NewsList  extends React.Component{
  constructor(props){
    super(props);
      this.LoadMore=this.LoadMore.bind(this)
      this.infiniteLoad = this.infiniteLoad.bind(this)
  }
  componentWillMount(){
      this.props.setElements(this.buildElements(0,3))
    }
  componentDidMount(){
    window.addEventListener('scroll', this.infiniteLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteLoad);
}
    LoadMore() {
        const elemLength = this.props.elements.length;
        const  newElements = this.buildElements(elemLength, elemLength + 1);
        this.props.addElements(newElements)
    }
      buildElements(start, end) {
        let elements = [];
        let news=this.props.user.wall.news.sort(  function(a, b) {
          if (a.id > b.id) { return -1;}
          if (a.id < b.id) { return 1; }
          return 0; })
        if(!news[end]){this.props.isNewElements(false)}
        for (let i = start; i < end; i++) {
          if (news[i]){
            elements.push(<NewsItem news={news[i]} key={news[i].id} current_user={this.props.current_user} id={news[i].user_id}
              name={news[i].user.name} url={news[i].user.avatar.url} text={news[i].text}  />)
        }

      }
          return elements;
      }
     infiniteLoad(){
       if (!this.props.isElements){ return false}
       const height = document.getElementsByTagName('body')[0].clientHeight - (window.innerHeight + window.pageYOffset)
         if (height< 60){
         this.LoadMore()
       }

     }
    render() {
     const current_user= this.props.current_user
    return (
      <div className='border shadow' >
        <h3 className='align-center'>News</h3>
         {this.props.elements}
         {(this.props.isElements)? <button className='margin' type="button" onClick={this.LoadMore}>Load more</button>:''}
        </div>
      )
    }
}
