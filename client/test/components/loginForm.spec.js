/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../components/auth/LoginForm';

jest.mock('react-router-dom');
describe('login form component', () => {
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
    logged: true
  };

  const wrapper = shallow(<LoginForm {...props} />);

  describe('renders', () => {
    it('renders as a div', () => {
      expect(wrapper.node.type).toEqual('div');
    });
  });
});
