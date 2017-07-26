/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile } from '../../components/users/UserProfile';

describe('Users component', () => {
  const props = {
    currentUser: {},
    updateUserDetails: jest.fn(() => Promise.resolve())
  };
  const event = {
    preventDefault: jest.fn()
  };
  const wrapper = shallow(<UserProfile {...props} />);
  it('renders as a main body', () => {
    expect(wrapper.node.type).toEqual('main');
  });
  const spy = jest.spyOn(wrapper.instance(), 'onChange');
  wrapper.instance().onChange({
    target: {
      value: 'mayowa', name: 'password'
    }
  });
  wrapper.instance().onChange({
    target: {
      value: 'mayor', name: 'confirmPassword'
    }
  });
  expect(wrapper.state('password')).toEqual('mayowa');
  expect(spy).toHaveBeenCalledTimes(2);

  const submitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
  wrapper.instance().onSubmit(event);
  expect(submitSpy).toHaveBeenCalledTimes(1);

  const componentDidMountSpy =
  jest.spyOn(wrapper.instance(), 'componentDidMount');
  wrapper.instance().componentDidMount();
  expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

  it(`should redirect user to the document 
  page if update was state is true`, () => {
    wrapper.setState({ success: true });
    expect(wrapper.state('success')).toEqual(true);
  });
});
