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
    axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`).then((res) => {
      const users = res.data.user;
      const pagination = res.data.pagination;
      dispatch(getUsers({ users, pagination }));
    });
}

export function searchUserDb(searchQuery) {
  return dispatch =>
    axios.get(`/api/v1/search/users?q=${searchQuery}`).then((res) => {
      const user = res.data.user;
      const pagination = res.data.pagination;
      dispatch(search({ user, pagination }));
    });
}

export function deleteUserRecord(id) {
  return dispatch =>
    axios.delete(`/api/v1/users/${id}`).then(() => {
      dispatch(deleteUser());
    });
}
