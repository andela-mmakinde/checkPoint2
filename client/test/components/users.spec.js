/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../../components/users/Users';

describe('Users component', () => {
  const props = {
    getAllUsers: jest.fn(() => Promise.resolve()),
    deleteUserRecord: jest.fn(() => Promise.resolve()),
    currentUser: {},
    pagination: { pageCount: 3 },
    allUsers: [],
    searchUserDb: jest.fn()
  };
  const nextProps = {
    allUsers: [],
    pagination: { pageCount: 3 }
  };
  const data = {
    selected: 3,
  };
  const wrapper = shallow(<Users {...props} />);

  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });

  it('should contain the method componentDidMount', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method handlePageClick', () => {
    const handlePageClickSpy =
    jest.spyOn(wrapper.instance(), 'handlePageClick');
    wrapper.instance().handlePageClick(data);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method deleteUser', () => {
    const deleteUserSpy =
    jest.spyOn(wrapper.instance(), 'deleteUser');
    wrapper.instance().deleteUser(data);
    expect(deleteUserSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method componentWillReceiveProps', () => {
    const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
});
