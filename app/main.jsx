'use strict'
// LIBRARIES
import React from 'react';
import {browserHistory, Route, Router } from 'react-router';
import {render} from 'react-dom';

// COMPONENTS
import App from './components';

render(
  <Router history={browserHistory}>
    <Route path="/" component="App" />
  </Router>,
  document.getElementById('main')
);
