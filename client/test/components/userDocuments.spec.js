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
  const nextProps = {
    documentsFromReducer: {},
    pagination: { pageCount: 3 }
  };
  const data = {
    selected: 3,
  };

  const wrapper = shallow(<UserDocuments {...props} />);
  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });

  it('should call the method componentDidMount', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method componentWillReceiveProps', () => {
    const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method handlePageClick', () => {
    const handlePageClickSpy =
    jest.spyOn(wrapper.instance(), 'handlePageClick');
    wrapper.instance().handlePageClick(data);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method deleteDocument', () => {
    const deleteDocumentSpy =
    jest.spyOn(wrapper.instance(), 'deleteDocument');
    wrapper.instance().deleteDocument(data);
    expect(deleteDocumentSpy).toHaveBeenCalledTimes(1);
  });
});

