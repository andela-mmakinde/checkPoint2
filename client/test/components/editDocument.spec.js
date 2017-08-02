/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { EditDocument } from '../../components/documents/EditDocument';

describe('Edit Document component', () => {
  const props = {
    document: {},
    updateDocument: jest.fn(() => Promise.resolve()),
    searchDocumentById: jest.fn(() => Promise.resolve()),
    material_select: jest.fn(),
    match: { params: {} }
  };
  const event = {
    preventDefault: jest.fn()
  };
  const wrapper = shallow(<EditDocument {...props} />);

  it('changes the title when the on change function is called', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange({
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

  it('changes the acces type when the on change function is called', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange({
      target: {
        value: 'Public', name: 'access'
      }
    });
    expect(wrapper.state('access')).toEqual('Public');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('contains a componentDidMount function', () => {
    const componentDidMountSpy =
    jest.spyOn(wrapper.instance(), 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
});
