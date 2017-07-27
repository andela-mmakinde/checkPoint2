import * as actionTypes from '../actions/actionType';

const initialState = {
  userData: [],
  pagination: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return { ...state,
        userData: action.users.users,
        pagination: action.users.pagination };
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state,
        userData: action.user.user,
        pagination: action.user.pagination };
    default:
      return state;
  }
};

