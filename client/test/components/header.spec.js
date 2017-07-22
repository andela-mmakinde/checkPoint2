/* global expect */

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/includes/Header';

describe('Create Document component', () => {
  const props = {
    currentUser: {},
  };

  const wrapper = shallow(<Header {...props} />);

  it('renders as a nav bar', () => {
    expect(wrapper.node.type).toEqual('nav');
  });
});
