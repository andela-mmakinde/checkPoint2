import axios from 'axios';
import * as actionTypes from './actionType';

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

export function getAllUsers(offset = 0, limit = 5) {
  return dispatch =>
    axios.get(`/api/users?limit=${limit}&offset=${offset}`).then((users) => {
      dispatch(getUsers(users));
    });
}

export function searchUserDb(searchQuery) {
  return dispatch =>
    axios.get(`/api/search/users?q=${searchQuery}`).then((user) => {
      dispatch(search(user));
    });
}

export function deleteUserRecord(id) {
  return dispatch =>
    axios.delete(`/api/users/${id}`).then(() => {
      dispatch(deleteUser());
    });
}
