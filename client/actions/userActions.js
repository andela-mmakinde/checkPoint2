import axios from 'axios';
import * as actionTypes from './actionType';

export function update(updatedUser) {
  return { type: actionTypes.UPDATE_USER_DETAILS,
    updatedUser
  };
}

export function getUsers(users) {
  return { type: actionTypes.GET_ALL_USERS,
    users
  };
}

export function search(user) {
  return {
    type: actionTypes.SEARCH_USER_SUCCESS,
    user
  };
}

export function deleteUser() {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
}

export function updateUserDetails(id, userDetails) {
  return dispatch =>
    axios.put(`/users/${id}`, userDetails).then((updatedUser) => {
      dispatch(update(updatedUser));
    });
}

export function getAllUsers() {
  return dispatch =>
    axios.get('/users').then((users) => {
      dispatch(getUsers(users));
    });
}

export function searchUserDb(searchQuery) {
  return dispatch =>
    axios.get(`/search/users?q=${searchQuery}`).then((user) => {
      dispatch(search(user));
    });
}

export function deleteUserRecord(id) {
  return dispatch =>
    axios.delete(`/users/${id}`).then(() => {
      dispatch(deleteUser());
    });
}
