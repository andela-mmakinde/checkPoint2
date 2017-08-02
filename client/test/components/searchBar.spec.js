/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../../components/documents/SearchBar';

const props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  clearField: jest.fn(),
  searchQuery: ''
};
describe('SearchBar component', () => {
  it('renders as a form', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    expect(wrapper.node.type).toEqual('form');
  });
});
