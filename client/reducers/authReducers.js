import * as actionTypes from '../actions/actionType';

const initialState = {
  isLogged: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        isLogged: true,
        user: action.loggedInUser,
      };
    default:
      return state;
  }
};
