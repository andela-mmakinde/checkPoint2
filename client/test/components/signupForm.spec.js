/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../components/auth/SignupForm';

jest.mock('react-router-dom');

describe('SignUpForm component', () => {
  const error = { message: 'Take sorry' };
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    error,
    password: '123455',
    confirmPassword: '123455',
    email: 'hello@hello.com',
    fullName: 'Ay show',
    logged: true
  };
  const wrapper = shallow(<SignupForm {...props} />);

  describe('SignUpFor component', () => {
    it('renders as a div', () => {
      expect(typeof wrapper.node.type).toEqual('function');
    });
  });
});
