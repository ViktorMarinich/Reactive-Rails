import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import User from './components/User';
import { Provider } from 'react-redux'
import store from './store'

document.addEventListener('DOMContentLoaded', function() {

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute  component={User} />
        </Route>
    </Router>
  </Provider>,
   document.getElementById('app'));
});
