/* global localStorage */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';
import setAuthorizationHeader from '../utilities/setAuthorizationHeader';

/**
 * Create an action to set currently logged in user
 *
 * @export
 * @param {object} loggedInUser
 * @returns {object} type payload
 */
export function setUser(loggedInUser) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser
  };
}

/**
 * Request to the API to login a user
 *
 * @export
 * @param {any} userData The details of the user to be logged in
 * @returns {object} dispatch object
 */
export function userLoginRequest(userData) {
  return dispatch => axios.post('/api/v1/users/login', userData).then((res) => {
    const token = res.data.jsonToken;
    localStorage.setItem('token', token);
    setAuthorizationHeader(token);
    const loggedInUser = jwtDecode(token).userDetails;
    dispatch(setUser(loggedInUser));
  });
}

/**
 * Request to the API to create a new user
 *
 * @export
 * @param {object} userData
 * @returns {object} dispatch object
 */
export function userSignUpRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/users', userData).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('token', token);
      setAuthorizationHeader(token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function updateUserDetails(id, userDetails) {
  return dispatch =>
    axios.put(`/api/v1/users/${id}`, userDetails).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('token', token);
      setAuthorizationHeader(token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

/**
 * Request to delete user token from localStorage
 *
 * @export
 * @returns {object} - remove token
 */
export function logout() {
  return () => {
    localStorage.removeItem('token');
  };
}
