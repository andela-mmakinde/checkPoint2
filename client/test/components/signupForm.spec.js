import React from 'react';
import { mount } from 'enzyme';
import SignupForm from '../../components/auth/SignupForm';

jest.mock('react-router-dom');

describe('SignUpForm component', () => {
  let wrapper;

  beforeAll(() => {
    const error = {
      message: 'Take sorry'
    };
    const props = {
      onSubmit: jest.fn(),
      onChange: jest.fn(),
      error,
      password: '123455',
      confirmPassword: '123455',
      email: 'hello@hello.com',
      fullName: 'Ay show',
      logged: false
    };
    wrapper = mount(<SignupForm {...props} />);
  });

  describe('SignUpFor component', () => {
    it('renders', () => {
      wrapper.setProps({ logged: true });
      expect(true).toEqual(true);
    });
  });
});
