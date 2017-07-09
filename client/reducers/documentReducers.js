import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return action.userAccessDocuments.document.rows;
    case actionTypes.GET_USER_DOCUMENT_SUCCESS:
      return action.userCreatedDocuments.myDocuments;
    case actionTypes.DELETE_DOCUMENT_SUCCESS:
      return action.successMessage.data.message;
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return action.document.data.documents;
    case actionTypes.SEARCH_DOCUMENTBYID_SUCCESS:
      return action.singleDocument.data;
    default:
      return state;
  }
};
