/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { UserDocuments } from '../../components/documents/UserDocuments';

describe('Users component', () => {
  const props = {
    currentUser: {},
    myDocuments: jest.fn(() => Promise.resolve()),
    deleteDocuments: jest.fn(() => Promise.resolve()),
    documentsFromReducer: {}
  };

  const wrapper = shallow(<UserDocuments {...props} />);
  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });
  it('should call the method componentDidMount', () => {
    const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
});
