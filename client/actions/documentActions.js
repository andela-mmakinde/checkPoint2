import axios from 'axios';
import * as actionTypes from './actionType';

export function createNewDocument(document) {
  return {
    type: actionTypes.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

export function update() {
  return {
    type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
  };
}

export function searchDocs(documents) {
  return {
    type: actionTypes.SEARCH_DOCUMENT_SUCCESS,
    documents
  };
}

export function singleDoc(document) {
  return {
    type: actionTypes.SEARCH_DOCUMENTBYID_SUCCESS,
    document
  };
}
export function fetchUserAccessDocument(documents) {
  return {
    type: actionTypes.GET_DOCUMENT_SUCCESS,
    documents
  };
}

export function userDocument(documents) {
  return {
    type: actionTypes.GET_USER_DOCUMENT_SUCCESS,
    documents
  };
}

export function deleteRecord(successMessage) {
  return {
    type: actionTypes.DELETE_DOCUMENT_SUCCESS,
    successMessage
  };
}

export function saveDocumentRequest(document) {
  return dispatch => axios.post('/api/v1/documents', document).then((response) => {
    dispatch(createNewDocument(response));
  });
}

export function fetchAllUserDocument(offset = 0, limit = 6) {
  return dispatch => axios.get(`/api/v1/documents?limit=${limit}&offset=${offset}`).then((res) => {
    const documents = res.data.document;
    const pagination = res.data.pagination;
    dispatch(fetchUserAccessDocument({ documents, pagination }));
  });
}

export function myDocuments(id, offset = 0, limit = 6) {
  return dispatch =>
    axios.get(`/api/v1/users/${id}/documents/?limit=${limit}&offset=${offset}`).then((res) => {
      const documents = res.data.myDocuments;
      const pagination = res.data.pagination;
      dispatch(userDocument({ documents, pagination }));
    });
}

export function deleteDocuments(id) {
  return dispatch =>
    axios.delete(`/api/v1/documents/${id}`).then((successMessage) => {
      dispatch(deleteRecord(successMessage));
    });
}

export function searchDocuments(searchQuery) {
  return dispatch =>
    axios.get(`/api/v1/search/documents?q=${searchQuery}`).then((res) => {
      const documents = res.data.document;
      const pagination = res.data.pagination;
      dispatch(searchDocs({ documents, pagination }));
    });
}

export function updateDocument(id, documentToUpdate) {
  return dispatch =>
    axios.put(`/api/v1/documents/${id}`, documentToUpdate).then(() => {
      dispatch(update());
    });
}

export function searchDocumentById(id) {
  return dispatch =>
    axios.get(`/api/v1/documents/${id}`).then((document) => {
      dispatch(singleDoc(document));
    });
}
