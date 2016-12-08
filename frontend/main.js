import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import User from './components/User';
import Settings from './components/Settings';
import FriendList from './components/FriendList';
import GalleryPage from './components/GalleryPage';
import { Provider } from 'react-redux'
import store from './store'

document.addEventListener('DOMContentLoaded', function() {

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='/settings' component={Settings}/>
            <Route path='/gallery' component={GalleryPage}/>
            <Route path='/friends' component={FriendList}/>
            <Route path='/user/:userId' component={User} />
          </Route>
    </Router>
  </Provider>,
   document.getElementById('app'));
});
