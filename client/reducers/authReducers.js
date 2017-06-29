import * as actionTypes from '../actions/actionType';

const initialState = {
  access: {
    user: {},
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        user: action.user,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        loading: false
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        user: action.loggedInUser,
      };
    default:
      return state;
  }
};
