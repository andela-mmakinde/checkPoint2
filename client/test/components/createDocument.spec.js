/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { CreateDocument } from '../../components/documents/CreateDocument';

describe('Create Document component', () => {
  const props = {
    saveDocumentRequest: jest.fn(() => Promise.resolve()),
    fetchAllUserDocument: jest.fn(() => Promise.resolve())
  };
  const event = {
    preventDefault: jest.fn()
  };

  const wrapper = shallow(<CreateDocument {...props} />);

  it('contains an onTitleChange function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onTitleChange');
    wrapper.instance().onTitleChange({
      target: {
        value: 'Document1', name: 'title'
      }
    });
    expect(wrapper.state('title')).toEqual('Document1');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('contains an onSubmit function', () => {
    const submitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('contains an updateAccessState function', () => {
    const updateAccessSpy = jest.spyOn(wrapper.instance(), 'updateAccessState');
    wrapper.instance().updateAccessState();
    expect(updateAccessSpy).toHaveBeenCalledTimes(1);
  });
});
