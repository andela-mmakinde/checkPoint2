/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import { Documents } from '../../components/documents/Document';

describe('Document container component', () => {
  const fetchAllUserDocument = jest.fn(() => Promise.resolve());
  const deleteDocuments = jest.fn();
  const props = {
    fetchAllUserDocument,
    deleteDocuments
  };
  const nextProps = {
    documentList: [{}],
    pagination: { pageCount: 3 }
  };
  const page = {
    selected: 3,
  };
  const wrapper = shallow(<Documents {...props} />);

  it('should contain the method componentDidMount', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it(`should contain the method componentWillReceiveProps
   which sets new props to state on call`, () => {
    const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.documents).toEqual([{}]);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method handlePageClick', () => {
    const handlePageClickSpy =
    jest.spyOn(wrapper.instance(), 'handlePageClick');
    wrapper.instance().handlePageClick(page);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });
});
