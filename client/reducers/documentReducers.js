import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return action.documents;
    case actionTypes.GET_USER_DOCUMENT_SUCCESS:
      return action.documents;
    case actionTypes.DELETE_DOCUMENT_SUCCESS:
      return action.successMessage.data.message;
    case actionTypes.SEARCH_DOCUMENT_SUCCESS:
      return action.documents.data;
    case actionTypes.SEARCH_DOCUMENTBYID_SUCCESS:
      return action.singleDocument.data;
    default:
      return state;
  }
};

    // dispatch(fetchUserAccessDocument({ userAccessDocuments, pagination }));
