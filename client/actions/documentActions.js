import axios from 'axios';
import * as actionTypes from './actionType';

const createNewDocument = document => ({
  type: actionTypes.CREATE_DOCUMENT_SUCCESS,
  document
});

const update = () => ({
  type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
});
const searchDocs = documents => ({
  type: actionTypes.SEARCH_DOCUMENT_SUCCESS,
  documents
});
const singleDoc = document => ({
  type: actionTypes.SEARCH_DOCUMENTBYID_SUCCESS,
  document
});
const fetchUserAccessDocument = documents => ({
  type: actionTypes.GET_DOCUMENT_SUCCESS,
  documents
});
const userDocument = documents => ({
  type: actionTypes.GET_USER_DOCUMENT_SUCCESS,
  documents
});
const deleteRecord = successMessage => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS,
  successMessage
});

/**
 * Request to the API to create a new document
 *
 * @export
 * @param {object} document object to create
 * @returns {object} dispatch object
 */
export function saveDocumentRequest(document) {
  return dispatch => axios.post('/api/v1/documents', document)
  .then((response) => {
    dispatch(createNewDocument(response));
  });
}

/**
 * Request to the API to fetch all documents user has access to.
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=8]
 * @returns {object} dispatch object
 */
export function fetchAllUserDocument(offset = 0, limit = 8) {
  return dispatch =>
  axios.get(`/api/v1/documents?limit=${limit}&offset=${offset}`)
  .then((res) => {
    const documents = res.data.document;
    const pagination = res.data.pagination;
    dispatch(fetchUserAccessDocument({ documents, pagination }));
  });
}

/**
 * Request to the API to fetch all document a user created
 *
 * @export
 * @param {number} id
 * @param {number} [offset=0]
 * @param {number} [limit=8]
 * @returns {object} dispatch object
 */
export function myDocuments(id, offset = 0, limit = 8) {
  return dispatch =>
    axios.get(`/api/v1/users/${id}/documents/?limit=${limit}&offset=${offset}`)
    .then((res) => {
      const documents = res.data.myDocuments;
      const pagination = res.data.pagination;
      dispatch(userDocument({ documents, pagination }));
    });
}

/**
 * Request to the API to delete a document
 *
 * @export
 * @param {number} id
 * @returns {object} dispatch object
 */
export function deleteDocuments(id) {
  return dispatch =>
    axios.delete(`/api/v1/documents/${id}`).then((successMessage) => {
      dispatch(deleteRecord(successMessage));
    });
}

/**
 * Request to the API to search for a document
 *
 * @export
 * @param {string} searchQuery
 * @returns {object} dispatch object
 */
export function searchDocuments(searchQuery) {
  return dispatch =>
    axios.get(`/api/v1/search/documents?q=${searchQuery}`).then((res) => {
      const documents = res.data.document;
      const pagination = res.data.pagination;
      dispatch(searchDocs({ documents, pagination }));
    });
}

/**
 * Request to the API to update an existing document
 *
 * @export
 * @param {number} id
 * @param {object} documentToUpdate
 * @returns {object} dispatch object
 */
export function updateDocument(id, documentToUpdate) {
  return dispatch =>
    axios.put(`/api/v1/documents/${id}`, documentToUpdate).then(() => {
      dispatch(update());
    });
}

/**
 * Request to the API to update an existing document
 *
 * @export
 * @param {number} id
 * @returns {object} dispatch object
 */
export function searchDocumentById(id) {
  return dispatch =>
    axios.get(`/api/v1/documents/${id}`).then((document) => {
      dispatch(singleDoc(document));
    });
}
