import axios from 'axios';

export function userSignUpRequest(userData) {
  return dispatch => (
    axios.post('/users', userData)
  );
}
