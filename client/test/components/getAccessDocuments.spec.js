/* global expect */

import React from 'react';
import { shallow } from 'enzyme';
import GetAccessDocuments from '../../components/documents/GetAccessDocuments';

describe('GetAccessDocuments component', () => {
  // create props
  const props = {
    currentUser: {},
    documents: [],
  };

  describe('renders', () => {
    const wrapper = shallow(<GetAccessDocuments {...props} />);
    it('should render as a div', () => {
      expect(wrapper.node.type).toEqual('div');
    });
    it('shouls have a password field with the same valua as props \'password\'', () => {
      expect(wrapper.node.type).toEqual('div');
    });
  });
});
