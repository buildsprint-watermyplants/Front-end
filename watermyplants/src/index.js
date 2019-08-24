import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// with this you dont have to type the full url
// do this: axios.get(/login).then().catch()
axios.defaults.baseURL = 'https://bs-water-my-plants.herokuapp.com';


// this will place the token we stored to local storage to the authorization header
axios.interceptors.request.use(
  options => {
    options.headers.authorization = `${localStorage.token}`;
    return options;
  },
  err => {
    // do something with the error
    return Promise.reject(err);
  }
);

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
