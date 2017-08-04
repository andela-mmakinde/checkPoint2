/* global expect */
import authReducer from '../../reducers/authReducers';
import * as actionType from '../../actions/actionType';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
        isLogged: false,
        user: {},
      }
    );
  });

  it('should handle getting current user', () => {
    const loggedInUser = { name: 'mayowa' };
    const action = { type: actionType.SET_CURRENT_USER, loggedInUser };
    expect(authReducer({}, action)).toEqual(
      {
        isLogged: true,
        user: { name: 'mayowa' },
      }
    );
  });

  it('should handle logging a user out', () => {
    const action = { type: actionType.LOGOUT };
    expect(authReducer({
      isLogged: false,
      user: {},
    }, action)).toEqual(
      {
        isLogged: false,
        user: {},
      }
    );
  });
});
