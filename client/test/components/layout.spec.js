/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../components/Layout';

describe('Home page component', () => {
  const wrapper = shallow(<Layout />);
  it('renders', () => {
    expect(wrapper.node.type).toEqual('div');
  });
});
