/* global expect */

import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home';

describe('Footer component', () => {
  it('renders as a footer', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.node.type).toEqual('div');
  });
});
