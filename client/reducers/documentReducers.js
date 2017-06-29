import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return action.userAccessDocuments.document;
    case actionTypes.GET_USER_DOCUMENT_SUCCESS:
      return action.userCreatedDocuments.data.ownerDocuments;
    case actionTypes.DELETE_DOCUMENT_SUCCESS:
      return action.successMessage.data.message;
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return action.document.data.documents;
    default:
      return state;
  }
};
