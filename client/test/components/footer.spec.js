/* global expect */

import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/includes/Footer';

describe('Footer component', () => {
  it('renders as a footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.node.type).toEqual('footer');
  });
});
