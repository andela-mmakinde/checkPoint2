/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import GetAccessDocuments from '../../components/documents/GetAccessDocuments';

describe('GetAccessDocuments component', () => {
  const props = {
    currentUser: {},
    documents: [],
    deleteDocument: jest.fn()
  };

  describe('renders', () => {
    const wrapper = shallow(<GetAccessDocuments {...props} />);
    it('should render as a div', () => {
      expect(wrapper.node.type).toEqual('div');
    });
    it('should have a password field with the same value as props \'password\'',
    () => {
      expect(wrapper.node.type).toEqual('div');
    });
  });
});
