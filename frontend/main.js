import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import User from './components/User';

document.addEventListener('DOMContentLoaded', function() {

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute  component={User} />
        </Route>
    </Router>,
   document.getElementById('app'));
});
