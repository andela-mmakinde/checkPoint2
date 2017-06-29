import axios from 'axios';
import * as actionTypes from './actionType';

export function beginApiCall() {
  return { type: actionTypes.BEGIN_API_CALL };
}

export function createNewDocument(document) {
  return {
    type: actionTypes.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

export function searchDocs(document) {
  return {
    type: actionTypes.SEARCH_DOCUMENT_SUCCESS,
    document
  };
}

export function fetchUserAccessDocument(userAccessDocuments) {
  return {
    type: actionTypes.GET_DOCUMENT_SUCCESS,
    userAccessDocuments
  };
}

export function UserDocument(userCreatedDocuments) {
  return {
    type: actionTypes.GET_USER_DOCUMENT_SUCCESS,
    userCreatedDocuments
  };
}

export function deleteRecord(successMessage) {
  return {
    type: actionTypes.DELETE_DOCUMENT_SUCCESS,
    successMessage
  };
}

export function saveDocumentRequest(document) {
  return dispatch => axios.post('/documents', document).then((response) => {
    dispatch(createNewDocument(response));
  });
}

export function fetchAllUserDocument() {
  return dispatch => axios.get('/documents').then((res) => {
    const userAccessDocuments = res.data;
    dispatch(fetchUserAccessDocument(userAccessDocuments));
  });
}

export function myDocuments(id) {
  return dispatch =>
    axios.get(`/users/${id}/documents`).then((userCreatedDocuments) => {
      dispatch(UserDocument(userCreatedDocuments));
    });
}

export function deleteDocuments(id) {
  return dispatch =>
    axios.delete(`/documents/${id}`).then((successMessage) => {
      dispatch(deleteRecord(successMessage));
    });
}

export function searchDocuments(searchQuery) {
  return dispatch =>
    axios.get(`/search/documents?q=${searchQuery}`).then((document) => {
      dispatch(searchDocs(document));
    });
}
