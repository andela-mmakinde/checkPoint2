import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';
import setAuthorizationHeader from '../utilities/setAuthorizationHeader';

function beginApiCall() {
  return { type: actionTypes.BEGIN_API_CALL };
}

export function setUser(loggedInUser) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser
  };
}

function createNewUser(token) {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    token
  };
}

export function userLoginRequest(userData) {
  return dispatch => axios.post('/users/login', userData).then((res) => {
    const token = res.data.jsonToken;
    localStorage.setItem('token', token);
    setAuthorizationHeader(token);
    const loggedInUser = jwtDecode(token).userDetails;
    dispatch(setUser(loggedInUser));
  });
}

export function userSignUpRequest(userData) {
  return dispatch =>
    axios.post('/users', userData).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('token', token);
      setAuthorizationHeader(token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
  };
}
