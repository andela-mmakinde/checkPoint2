/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../../components/users/Users';

describe('Users component', () => {
  const props = {
    getAllUsers: jest.fn(() => Promise.resolve()),
    deleteUserRecord: jest.fn(() => Promise.resolve()),
    currentUser: {},
    searchUserDb: jest.fn()
  };
  it('renders as a div', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.node.type).toEqual('div');
  });
});
