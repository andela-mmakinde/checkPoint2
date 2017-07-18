import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';
import setAuthorizationHeader from '../utilities/setAuthorizationHeader';

export function setUser(loggedInUser) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser
  };
}

export function userLoginRequest(userData) {
  return dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.jsonToken;
    localStorage.setItem('token', token);
    setAuthorizationHeader(token);
    const loggedInUser = jwtDecode(token).userDetails;
    dispatch(setUser(loggedInUser));
  });
}

export function userSignUpRequest(userData) {
  return dispatch =>
    axios.post('/api/users', userData).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('token', token);
      setAuthorizationHeader(token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

export function updateUserDetails(id, userDetails) {
  return dispatch =>
    axios.put(`/api/users/${id}`, userDetails).then((res) => {
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
