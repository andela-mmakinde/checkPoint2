/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/authActions';
import mockLocalStorage from '../utils/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const jsonToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJ1c2VyRGV0YWlscyI6eyJpZCI6MTQsImVtYWlsIjoidGVkZHlAYm9
uZy5jb20iLCJyb2xlSWQiOjIsImZ1bGxOYW1lIjoiVGVkZHkgQm9uZyJ
9LCJpYXQiOjE1MDA2MjUxMjUsImV4cCI6MTUwMDcxMTUyNX0
.Ygdvz6SutNSZ0rwY8SCawSAhn1mrNV8Zf2aKSuMHHu8`;
window.localStorage = mockLocalStorage;

describe('auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates an action type SET_CURRENT_USER when update user 
  request is successful`, (done) => {
    moxios.stubRequest('/api/v1/users/14', {
      status: 201,
      response: {
        message: 'User updated',
        jsonToken,
      }
    });
    const store = mockStore({});

    const loggedInUser = {
      id: 14,
      email: 'teddy@bong.com',
      roleId: 2,
      fullName: 'Teddy Bong'
    };
    const expectedAction = actions.setUser;

    store.dispatch(actions.updateUserDetails(14,
    { email: 'mankinde53' })).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
      expect(store.getActions()[0].loggedInUser).toEqual(loggedInUser);
    });
    done();
  });

  it(`creates an action type SET_CURRENT_USER
  when signup request is successful`, (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 201,
      response: {
        message: 'User created',
        jsonToken,
      }
    });
    const store = mockStore({});

    const loggedInUser = {
      id: 14,
      email: 'teddy@bong.com',
      roleId: 2,
      fullName: 'Teddy Bong'
    };
    const expectedAction = actions.setUser;

    store.dispatch(actions.userSignUpRequest()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
      expect(store.getActions()[0].loggedInUser).toEqual(loggedInUser);
    });
    done();
  });

  it(`creates an action type SET_CURRENT_USER 
  when login request is successful`, (done) => {
    moxios.stubRequest('/api/v1/users/login', {
      status: 200,
      response: {
        message: 'Logged in!',
        jsonToken,
      }
    });
    const store = mockStore({});

    const loggedInUser = {
      id: 14,
      email: 'teddy@bong.com',
      roleId: 2,
      fullName: 'Teddy Bong'
    };

    const expectedAction = actions.setUser;

    store.dispatch(actions.userLoginRequest()).then(() => {
      expect(store.getActions()[0].loggedInUser).toEqual(loggedInUser);
      expect(store.getActions()[0].type).toEqual(expectedAction.type);
    });
    done();
  });

  it('deletes a user details from database', () => {
    expect(typeof actions.logout()).toEqual('function');
  });
});
