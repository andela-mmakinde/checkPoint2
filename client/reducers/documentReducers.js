import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return { ...state, ...action.documents };
    case actionTypes.GET_USER_DOCUMENT_SUCCESS:
      return { ...state, ...action.documents };
    case actionTypes.DELETE_DOCUMENT_SUCCESS:
      return action.successMessage.data.message;
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return { ...state, ...action.documents };
    case actionTypes.SEARCH_DOCUMENTBYID_SUCCESS:
      return { ...state, ...action.document };
    default:
      return state;
  }
};
// return { ...state, ...action.user.data };