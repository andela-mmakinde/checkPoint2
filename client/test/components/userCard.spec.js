/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import UserCard from '../../components/users/UserCard';

describe('Create Document component', () => {
  const props = {
    deleteUser: jest.fn(),
    allUsers: [],
  };
  const wrapper = shallow(<UserCard {...props} />);

  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });
});
