/* global expect */
import userReducer from '../../reducers/userReducers';
import * as actionType from '../../actions/actionType';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {
        userData: [],
        pagination: {}
      }
    );
  });

  it('should handle GET_ALL_USERS', () => {
    const users = {
      users: [{ name: 'mayowa' }, { name: 'oriyomi' }],
      pagination: { count: 3, total: 10 }
    };
    const action = { type: actionType.GET_ALL_USERS, users };
    expect(userReducer({}, action)).toEqual(
      {
        userData: [{ name: 'mayowa' }, { name: 'oriyomi' }],
        pagination: { count: 3, total: 10 }
      }
    );
  });

  it('should handle SEARCH_USER_SUCCESS', () => {
    const user = {
      user: [{ name: 'mayowa' }, { name: 'mankind' }],
      pagination: { count: 1, total: 2 }
    };
    const action = { type: actionType.SEARCH_USER_SUCCESS, user };
    expect(userReducer({}, action)).toEqual(
      {
        userData: [{ name: 'mayowa' }, { name: 'mankind' }],
        pagination: { count: 1, total: 2 }
      }
    );
  });
});
