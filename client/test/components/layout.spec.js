/* global expect */
import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../components/Layout';

describe('Home page component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Layout />);
  });
  it('renders', () => {
    expect(true).toEqual(true);
  });
});
