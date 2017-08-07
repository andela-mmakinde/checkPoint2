/* global jest expect */

import React from 'react';
import { shallow } from 'enzyme';

import { SignUpPage } from '../../components/auth/SignUpPage';

describe('Signup page component', () => {
  const userSignUpRequest = jest.fn(() => Promise.resolve());
  const event = {
    preventDefault: jest.fn()
  };
  const wrapper = shallow(<SignUpPage userSignUpRequest={userSignUpRequest} />);
  it('should run when the onChange function is called', () => {
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
    wrapper.instance().onChange({
      target: {
        value: 'mayowa makinde', name: 'fullName'
      }
    });
    wrapper.instance().onChange({
      target: {
        value: 'mayowa', name: 'confirmPassword'
      }
    });
    expect(wrapper.state('email')).toEqual('may@gmail.com');
    expect(wrapper.state('password')).toEqual('mayowa');
    expect(wrapper.state('confirmPassword')).toEqual('mayowa');
    expect(wrapper.state('fullName')).toEqual('mayowa makinde');
    expect(spy).toHaveBeenCalledTimes(4);
    const submitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
