import * as actionTypes from '../actions/actionType';

const initialState = {
  access: {
    user: {},
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        user: action.loggedInUser,
      };
    default:
      return state;
  }
};
