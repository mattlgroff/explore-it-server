import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER} from './types';

//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
  return function (dispatch) {
    console.log(API_URL);
    console.log(CLIENT_ROOT_URL);
    axios.post(`${API_URL}auth/login`, { email, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      browserHistory.goBack();
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
      alert("why are you still going back! Even why i delete you?");
      // browserHistory.goBack();
    });
  };
}

export function registerUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}auth/register`, { email, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      browserHistory.goBack();
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
      alert("But here you are not!!!")
    });
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    browserHistory.goBack();
  };
}

