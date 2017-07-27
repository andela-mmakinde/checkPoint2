/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/includes/Header';

describe('Create Document component', () => {
  const props = {
    currentUser: {},
    logout: jest.fn()
  };

  const wrapper = shallow(<Header {...props} />);

  it('renders as a nav bar', () => {
    expect(wrapper.node.type).toEqual('nav');
  });
  it('contains a componentDidMount function', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('contains a logout function', () => {
    const logoutSpy =
    jest.spyOn(wrapper.instance(), 'logout');
    wrapper.instance().logout();
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
