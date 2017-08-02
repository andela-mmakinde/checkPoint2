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
    docObj: {
      title: '123455',
      access: 'Public'
    },
    error,
  };

  describe('renders', () => {
    const wrapper = shallow(<DocumentForm {...props} />);
    it('should have a password field with the same value as props \'password\'',
    () => {
      const title = wrapper.find('#title').props();
      expect(title.value).toEqual(props.docObj.title);
    });
  });
});
