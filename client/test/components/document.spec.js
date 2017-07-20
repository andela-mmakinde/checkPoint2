/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import { Documents } from '../../components/documents/Document';

describe('Document container component', () => {
  const fetchAllUserDocument = jest.fn(() => Promise.resolve());
  const props = {
    fetchAllUserDocument,
  };
  const wrapper = shallow(<Documents {...props} />);
  it('should call the method componentDidMount', () => {
    const componentDidMountSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  // it('should call the method componentWillReceiveProps', () => {
  //   const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentDidMount');
  //   wrapper.instance().componentWillReceiveProps();
  //   expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  // });
});
