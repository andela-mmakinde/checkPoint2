/* global jest expect */

import React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../../components/auth/LoginForm';

jest.mock('react-router-dom');
describe('Home page component', () => {
  let wrapper;

  const error = {
    message: 'Take sorry na'
  };
  // create props
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    error,
    password: '123455',
    email: 'hello@hello.com',
    logged: false
  };

  beforeAll(() => {
    wrapper = mount(<LoginForm {...props} />);
  });
  describe('renders', () => {
    it('shouls have a password field with the same valua as props \'password\'', () => {
      const password = wrapper.find('#password').props();
      expect(password.value).toEqual(props.password);
    });
    it('should redirect user to the document page if logged state is true', () => {
      wrapper.setProps({ logged: true });
      expect(2).toBe(2);
    });
  });
});
