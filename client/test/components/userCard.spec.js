/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import UserCard from '../../components/users/UserCard';

describe('Create Document component', () => {
  const props = {
    deleteUser: jest.fn(),
    allUsers: [],
  };
  const nextProps = {
    allUsers: [],
  };
  const wrapper = shallow(<UserCard {...props} />);

  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });

  it('should contain the method componentWillReceiveProps', () => {
    const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
});
