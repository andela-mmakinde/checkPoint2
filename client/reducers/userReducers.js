import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DETAILS:
      return {
        user: action.updatedUser,
      };
    case actionTypes.GET_ALL_USERS:
      return action.users.data;
    case actionTypes.SEARCH_USER_SUCCESS:
      return { ...state, user: action.user.data.users };
    default:
      return state;
  }
};
