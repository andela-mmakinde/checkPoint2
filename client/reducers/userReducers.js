import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return { ...state, ...action.users.data };
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state, ...action.user.data };
    default:
      return state;
  }
};

