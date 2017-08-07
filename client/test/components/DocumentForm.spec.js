/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import DocumentForm from '../../components/documents/DocumentForm';

jest.mock('react-router-dom');
describe('Home page component', () => {
  const error = {
    message: 'Take sorry na'
  };
  const props = {
    editorState: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    updateAccessState: jest.fn(),
    onTitleChange: jest.fn(),
    onEditorStateChange: jest.fn(),
    document: {
      title: '123455',
      access: 'Public'
    },
    error,
  };

  const wrapper = shallow(<DocumentForm {...props} />);
  it('renders as a div', () => {
    expect(wrapper.node.type).toEqual('div');
  });
  it('should have a title field with the same value as props \'title\'',
  () => {
    const title = wrapper.find('#title').props();
    expect(title.value).toEqual(props.document.title);
  });
});
