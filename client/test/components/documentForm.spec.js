/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import DocumentForm from '../../components/documents/DocumentForm';

jest.mock('react-router-dom');
describe('Home page component', () => {
  const error = {
    message: 'Take sorry na'
  };
  // create props
  const props = {
    editorState: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    updateAccessState: jest.fn(),
    onTitleChange: jest.fn(),
    onEditorStateChange: jest.fn(),
    error,
    title: '123455',
  };

  describe('renders', () => {
    const wrapper = shallow(<DocumentForm {...props} />);
    it('shouls have a password field with the same valua as props \'password\'', () => {
      const title = wrapper.find('#title').props();
      expect(title.value).toEqual(props.title);
    });
  });
});
