import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/documentActions';
import * as actionTypes from '../../actions/actionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const pagination = {
  total: 15,
  pageCount: 1,
  currentPage: 1,
  pageSize: 3
};

describe('Document actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to create a new document', () => {
    const document = {
      title: 'My One',
      content: 'This is so soooo awesome'
    };
    const expectedAction = {
      type: actionTypes.CREATE_DOCUMENT_SUCCESS,
      document
    };
    expect(actions.createNewDocument(document)).toEqual(expectedAction);
  });

  it('should create an action to update an existing document', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
    };
    expect(actions.update()).toEqual(expectedAction);
  });

  it('should create an action to search all documents', () => {
    const documents = {
      title: 'My One updated',
      content: 'This is so soooo awesome'
    };
    const expectedAction = {
      type: actionTypes.SEARCH_DOCUMENT_SUCCESS,
      documents
    };
    expect(actions.searchDocs(documents)).toEqual(expectedAction);
  });

  it('should create an action to get a single document by its id', () => {
    const document = {
      title: 'My One updated',
      content: 'This is so soooo awesome'
    };
    const expectedAction = {
      type: actionTypes.SEARCH_DOCUMENTBYID_SUCCESS,
      document
    };
    expect(actions.singleDoc(document)).toEqual(expectedAction);
  });

  it('should create an action to get all documents a user has access to', () => {
    const documents = {
      title: 'My access documents',
      content: 'This is so soooo awesome'
    };
    const expectedAction = {
      type: actionTypes.GET_DOCUMENT_SUCCESS,
      documents
    };
    expect(actions.fetchUserAccessDocument(documents)).toEqual(expectedAction);
  });

  it('should create an action to get all documents a user created', () => {
    const documents = {
      title: 'My personal documents',
      content: 'This is so soooo awesome'
    };
    const expectedAction = {
      type: actionTypes.GET_USER_DOCUMENT_SUCCESS,
      documents
    };
    expect(actions.userDocument(documents)).toEqual(expectedAction);
  });

  it('should create an action to delete users', () => {
    const successMessage = 'Document deleted successfully';
    const expectedAction = {
      type: actionTypes.DELETE_DOCUMENT_SUCCESS,
      successMessage
    };
    expect(actions.deleteRecord(successMessage)).toEqual(expectedAction);
  });

  it('creates an action type CREATE_DOCUMENT_SUCCESS when save document request is successful', (done) => {
    moxios.stubRequest('/api/v1/documents', {
      status: 201,
      response: {
        message: 'Document created',
        document: {
          title: 'New Document',
          content: 'It\'s newwww!'
        }
      }
    });
    const store = mockStore({});
    const expectedAction = actions.createNewDocument;

    store.dispatch(actions.saveDocumentRequest()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type CREATE_DOCUMENT_SUCCESS when save document request is successful', (done) => {
    moxios.stubRequest('/api/v1/documents?limit=6&offset=0', {
      status: 200,
      response: {
        document: [{
          title: 'New Document',
          content: 'It\'s newwww!'
        }],
        pagination
      }
    });
    const store = mockStore({});
    const expectedAction = actions.fetchUserAccessDocument;

    store.dispatch(actions.fetchAllUserDocument()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type GET_USER_DOCUMENT_SUCCESS when get my documents request is successful', (done) => {
    moxios.stubRequest('/api/v1/users/4/documents/?limit=6&offset=0', {
      status: 200,
      response: {
        document: [{
          title: 'New Document',
          content: 'It\'s newwww!'
        }],
        pagination
      }
    });
    const store = mockStore({});
    const expectedAction = actions.userDocument;

    store.dispatch(actions.myDocuments(4)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type DELETE_DOCUMENT_SUCCESS when delete documents request is successful', (done) => {
    moxios.stubRequest('/api/v1/documents/6', {
      status: 200,
      response: {
        successMessage: 'Document deleted successfully'
      }
    });
    const store = mockStore({});
    const expectedAction = actions.deleteRecord;

    store.dispatch(actions.deleteDocuments(6)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type UPDATE_DOCUMENT_SUCCESS when update documents request is successful', (done) => {
    moxios.stubRequest('/api/v1/documents/10', {
      status: 200,
      response: {
        updatedDocument: [{
          title: 'New Document',
          content: 'It\'s updated!'
        }],
        message: 'Update Successful'
      }
    });
    const store = mockStore({});
    const expectedAction = actions.update;

    store.dispatch(actions.updateDocument(10)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type SEARCH_DOCUMENT_SUCCESS when search documents request is successful', (done) => {
    moxios.stubRequest('/api/v1/search/documents?q=findMe', {
      status: 200,
      response: {
        documents: [{
          title: 'New Document',
          content: 'It\'s newwww!'
        }],
        pagination
      }
    });
    const store = mockStore({});
    const expectedAction = actions.searchDocs;

    store.dispatch(actions.searchDocuments('findMe')).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('creates an action type SEARCH_DOCUMENTBYID_SUCCESS when update documents request is successful', (done) => {
    moxios.stubRequest('/api/v1/documents/10', {
      status: 200,
      response: {
        document: [{
          title: 'New Document',
          content: 'It\'s newwww!'
        }],
      }
    });
    const store = mockStore({});
    const expectedAction = actions.singleDoc;

    store.dispatch(actions.searchDocumentById(10)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });
});
