import axios from 'axios';
import * as actionTypes from './actionType';

const getUsers = users => ({
  type: actionTypes.GET_ALL_USERS,
  users
});

const search = user => ({
  type: actionTypes.SEARCH_USER_SUCCESS,
  user
});

const deleteUser = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

/**
 * Request to the API to get all users
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=5]
 * @returns {object} dispatch object
 */
export function getAllUsers(offset = 0, limit = 5) {
  return dispatch =>
    axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`).then((res) => {
      const users = res.data.user;
      const pagination = res.data.pagination;
      dispatch(getUsers({ users, pagination }));
    });
}

/**
 * Request to the API to search for a document
 *
 * @export
 * @param {string} searchQuery
 * @returns {object} dispatch object
 */
export function searchUserDb(searchQuery) {
  return dispatch =>
    axios.get(`/api/v1/search/users?q=${searchQuery}`).then((res) => {
      const user = res.data.user;
      const pagination = res.data.pagination;
      dispatch(search({ user, pagination }));
    });
}

/**
 * Request to the API to delete a document
 *
 * @export
 * @param {any} id
 * @returns {object} dispatch object
 */
export function deleteUserRecord(id) {
  return dispatch =>
    axios.delete(`/api/v1/users/${id}`).then(() => {
      dispatch(deleteUser());
    });
}
