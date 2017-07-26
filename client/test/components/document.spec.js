/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import { Documents } from '../../components/documents/Document';

describe('Document container component', () => {
  const fetchAllUserDocument = jest.fn(() => Promise.resolve());
  const props = {
    fetchAllUserDocument,
  };
  const nextProps = {
    documentsFromReducer: {},
    pagination: { pageCount: 3 }
  };
  const data = {
    selected: 3,
  };
  const wrapper = shallow(<Documents {...props} />);
  it('should contain the method componentDidMount', () => {
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
});
