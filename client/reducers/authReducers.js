import * as actionTypes from '../actions/actionType';

const initialState = {
  isLogged: false,
  user: {},
};

/**
* Reducer for authentication-related actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        isLogged: true,
        user: action.loggedInUser,
      };
    case actionTypes.LOGOUT:
      return { ...state, isLogged: false };
    default:
      return state;
  }
};
