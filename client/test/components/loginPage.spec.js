/* global jest expect */
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/auth/LoginPage';

describe('Login Page', () => {
  const userLoginRequest = jest.fn(() => Promise.resolve());
  const props = {
    userLoginRequest,
  };
  const event = {
    preventDefault: jest.fn()
  };
  const wrapper = shallow(<LoginPage {...props} />);
  describe('Component', () => {
    test('should run when onChange function is called', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onChange');
      wrapper.instance().onChange({
        target: {
          value: 'may@gmail.com', name: 'email'
        }
      });
      wrapper.instance().onChange({
        target: {
          value: 'mayowa', name: 'password'
        }
      });
      expect(wrapper.state('email')).toEqual('may@gmail.com');
      expect(wrapper.state('password')).toEqual('mayowa');
      expect(spy).toHaveBeenCalledTimes(2);
      const submitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      wrapper.instance().onSubmit(event);
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
