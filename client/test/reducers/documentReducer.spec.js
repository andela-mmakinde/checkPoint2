/* global expect */
import documentReducer from '../../reducers/documentReducers';
import * as actionType from '../../actions/actionType';

describe('Document reducer', () => {
  it('should return the initial state', () => {
    expect(documentReducer(undefined, {})).toEqual(
      {
        documentList: {},
        pagination: {}
      }
    );
  });

  it('should handle GET_DOCUMENT_SUCCESS', () => {
    const documents = {
      documents: ['mayowa'],
      pagination: { count: 3, total: 10 }
    };
    const action = { type: actionType.GET_DOCUMENT_SUCCESS, documents };
    expect(documentReducer({}, action)).toEqual(
      {
        documentList: ['mayowa'],
        pagination: { count: 3, total: 10 },
      }
    );
  });

  it('should handle GET_USER_DOCUMENT_SUCCESS', () => {
    const documents = {
      documents: [{ title: 'mayowa' }, { title: 'makinde' }],
      pagination: { count: 1, total: 2 }
    };
    const action = { type: actionType.GET_USER_DOCUMENT_SUCCESS, documents };
    expect(documentReducer({}, action)).toEqual(
      {
        documentList: [{ title: 'mayowa' }, { title: 'makinde' }],
        pagination: { count: 1, total: 2 },
      }
    );
  });

  it('should handle SEARCH_DOCUMENT_SUCCESS', () => {
    const documents = {
      documents: [{ title: 'mayowa' }, { title: 'Another mayowa' }],
      pagination: { count: 1, total: 2 }
    };
    const action = { type: actionType.SEARCH_DOCUMENT_SUCCESS, documents };
    expect(documentReducer({}, action)).toEqual(
      {
        documentList: [{ title: 'mayowa' }, { title: 'Another mayowa' }],
        pagination: { count: 1, total: 2 },
      }
    );
  });

  it('should handle SEARCH_DOCUMENTBYID_SUCCESS', () => {
    const document =
    { data: { title: 'mayowa' }, status: 200, statusText: 'OK' };
    const action = { type: actionType.SEARCH_DOCUMENTBYID_SUCCESS, document };
    expect(documentReducer(
      {
        documentList: [{ title: 'mayowa' }, { title: 'Another mayowa' }],
        pagination: { count: 1, total: 2 },
      }, action)).toEqual(
      {
        documentList: { title: 'mayowa' },
        pagination: { count: 1, total: 2 },
      }
    );
  });
});
