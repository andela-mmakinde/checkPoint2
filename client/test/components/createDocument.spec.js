/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { CreateDocument } from '../../components/documents/CreateDocument';

describe('Create Document component', () => {
  const props = {
    saveDocumentRequest: jest.fn(() => Promise.resolve()),
    fetchAllUserDocument: jest.fn(() => Promise.resolve()),
    success: true
  };
  const event = {
    preventDefault: jest.fn()
  };
  const wrapper = shallow(<CreateDocument {...props} />);

  it('sets the state of title when the user types in data into the title field',
  () => {
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange({
      target: {
        value: 'Document1', name: 'title'
      }
    });
    expect(wrapper.state('title')).toEqual('Document1');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should contain the method componentDidMount', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('sets the state of access when the user selects an access type', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange({
      target: {
        value: 'Public', name: 'access'
      }
    });
    expect(wrapper.state('access')).toEqual('Public');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('contains an onSubmit method', () => {
    const submitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
