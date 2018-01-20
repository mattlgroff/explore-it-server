import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookies';
import routes from './routes';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';

// Import stylesheets
import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory}/>
    </Provider>,
  document.querySelector('.wrapper'));